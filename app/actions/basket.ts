"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

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