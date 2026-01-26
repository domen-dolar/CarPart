/*
  Server actions za delo s košarico in naročili.
  Vse funkcije se izvajajo izključno na strežniku
  in imajo direkten dostop do baze (Sanity).
*/
"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";

/* DODAJANJE IZDELKA V KOŠARICO */

export async function addToBasket(formData: FormData) {
  // Preverimo, ali je uporabnik prijavljen
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Podatki iz obrazca
  const slug = formData.get("product") as string;
  const quantity = Number(formData.get("quantity"));

  // Pridobimo izdelek iz baze glede na slug
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

  // Poiščemo obstoječo košarico uporabnika
  const basket = await client.fetch(
    `*[_type == "basket" && user._ref == $userId][0]`,
    { userId: session.user.id }
  );

  /* Če košarica še ne obstaja, jo ustvarimo */
  if (!basket) {
    await client.create({
      _type: "basket",
      user: { _type: "reference", _ref: session.user.id },
      items: [
        {
          _type: "orderItem",
          product: { _type: "reference", _ref: product._id },
          quantity,
          price: product.price,
        },
      ],
    });
    return;
  }

  // Preverimo, ali je izdelek že v košarici
  const existingItem = basket.items.find(
    (item: any) => item.product._ref === product._id
  );

  let updatedItems;

  /* Če izdelek že obstaja, povečamo količino */
  if (existingItem) {
    updatedItems = basket.items.map((item: any) =>
      item.product._ref === product._id
        ? {
            ...item,
            // količina ne sme preseči zaloge
            quantity: Math.min(item.quantity + quantity, product.stock),
          }
        : item
    );
  } else {
     /* Če izdelek še ni v košarici, ga dodamo */
    updatedItems = [
      ...basket.items,
      {
        _type: "orderItem",
        product: { _type: "reference", _ref: product._id },
        quantity,
        price: product.price,
      },
    ];
  }

  // Posodobimo košarico v bazi
  await client
    .patch(basket._id)
    .set({
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    })
    .commit();
}

/*  POSODOBITEV KOLIČINE IZDELKA V KOŠARICI */
export async function updateBasketItemQuantity(formData: FormData) {
  // Preverimo avtentikacijo
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Pridobimo košarico uporabnika
  const basket = await client.fetch(
    `*[_type == "basket" && user._ref == $userId][0]`,
    { userId: session.user.id }
  );

  const slug = formData.get("product") as string;
  const quantity = Number(formData.get("quantity"));

  // Pridobimo izdelek (zaradi _id)
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

  // Posodobimo samo količino izbranega izdelka
  const updatedItems = basket.items.map((item: any) =>
      item.product._ref === product._id
        ? {
            ...item,
            quantity,
          }
        : item
    );

    await client
    .patch(basket._id)
    .set({
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    })
    .commit();
}

/*  ODSTRANITEV IZDELKA IZ KOŠARICE */
export async function removeBasketItem(formData: FormData) {
  // Preverimo prijavo uporabnika
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Pridobimo košarico
  const basket = await client.fetch(
    `*[_type == "basket" && user._ref == $userId][0]`,
    { userId: session.user.id }
  );

  const slug = formData.get("product") as string;

  // Pridobimo izdelek
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

  // Odstranimo izdelek iz seznama
  const updatedItems = basket.items.filter(
    (item: any) => item.product._ref !== product._id
  );

  await client.patch(basket._id)
    .set({ items: updatedItems, updatedAt: new Date().toISOString() })
    .commit();
}


/*  USTVARJANJE NAROČILA IZ KOŠARICE */
export async function makeOrder() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Pridobimo košarico z izdelki in zalogo
  const basket = await client.fetch(
    `
    *[_type == "basket" && user._ref == $userId][0]{
      _id,
      items[]{
        quantity,
        price,
        product->{
          _id,
          name,
          stock
        }
      }
    }
    `,
    { userId: session.user.id }
  );

  // Košarica mora obstajati in ne sme biti prazna
  if (!basket || basket.items.length === 0) {
    throw new Error("basket is empty");
  }

  // Preverimo zalogo za vsak izdelek
  for (const item of basket.items) {
    if (item.quantity > item.product.stock) {
      throw new Error(
        `Not enough stock for ${item.product.name}`
      );
    }
  }

  // Izračun skupne cene
  const total = basket.items.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  // Objekt naročila
  const order = {
    _type: "order",
    user: {
      _type: "reference",
      _ref: session.user.id,
    },
    items: basket.items.map((item: any) => ({
      _type: "orderItem",
      product: {
        _type: "reference",
        _ref: item.product._id,
      },
      quantity: item.quantity,
      price: item.price,
    })),
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  /*
    Transakcija:
    1. ustvari naročilo
    2. zmanjša zalogo izdelkov
    3. izprazni košarico
  */
  const transaction = client.transaction();

  transaction.create(order);

  // posodobi zalogo
  for (const item of basket.items) {
    transaction.patch(item.product._id, {
      inc: { stock: -item.quantity },
    });
  }

  // Počisti košarico
  transaction.patch(basket._id, {
    set: { items: [] },
  });

  await transaction.commit();
  // Preusmeritev na pregled naročila
  redirect("/reviewOrder");
}

/*  PLAČILO NAROČILA */
export async function payOrder() {
  const session = await auth();
  

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Pridobimo zadnje čakajoče naročilo
  const order = await client.fetch(
    `
    *[
      _type == "order" &&
      status == "pending" &&
      user._ref == $userId
    ]
    | order(createdAt desc)[0]{
      _id
    }
    `,
    { userId: session.user.id }
  );

  if (!order) {
    throw new Error("No pending order found");
  }

  // Označimo naročilo kot plačano
  await client
    .patch(order._id)
    .set({
      status: "paid",
      paidAt: new Date().toISOString(),
    })
    .commit();

  // Preusmeritev na seznam naročil
  redirect("/orders");
}