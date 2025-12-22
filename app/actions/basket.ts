"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";

export async function addToBasket(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const slug = formData.get("product") as string;
  const quantity = Number(formData.get("quantity"));

  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

  const basket = await client.fetch(
    `*[_type == "basket" && user._ref == $userId][0]`,
    { userId: session.user.id }
  );

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

  const existingItem = basket.items.find(
    (item: any) => item.product._ref === product._id
  );

  let updatedItems;

  if (existingItem) {
    updatedItems = basket.items.map((item: any) =>
      item.product._ref === product._id
        ? {
            ...item,
            quantity: Math.min(item.quantity + quantity, product.stock),
          }
        : item
    );
  } else {
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

  await client
    .patch(basket._id)
    .set({
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    })
    .commit();
}

export async function updateBasketItemQuantity(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const basket = await client.fetch(
    `*[_type == "basket" && user._ref == $userId][0]`,
    { userId: session.user.id }
  );

  const slug = formData.get("product") as string;
  const quantity = Number(formData.get("quantity"));

  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

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

export async function removeBasketItem(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const basket = await client.fetch(
    `*[_type == "basket" && user._ref == $userId][0]`,
    { userId: session.user.id }
  );

  const slug = formData.get("product") as string;

  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

  const updatedItems = basket.items.filter(
    (item: any) => item.product._ref !== product._id
  );

  await client.patch(basket._id)
    .set({ items: updatedItems, updatedAt: new Date().toISOString() })
    .commit();
}

export async function makeOrder() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

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

  if (!basket || basket.items.length === 0) {
    throw new Error("basket is empty");
  }

  for (const item of basket.items) {
    if (item.quantity > item.product.stock) {
      throw new Error(
        `Not enough stock for ${item.product.name}`
      );
    }
  }

  const total = basket.items.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

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

  // Transaction: order creation + stock update + basket clear
  const transaction = client.transaction();

  transaction.create(order);

  // update stock
  for (const item of basket.items) {
    transaction.patch(item.product._id, {
      inc: { stock: -item.quantity },
    });
  }

  // clear basket
  transaction.patch(basket._id, {
    set: { items: [] },
  });

  await transaction.commit();

  redirect("/reviewOrder");
}

export async function payOrder() {
  const session = await auth();
  

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

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

  await client
    .patch(order._id)
    .set({
      status: "paid",
      paidAt: new Date().toISOString(),
    })
    .commit();

  redirect("/orders");
}