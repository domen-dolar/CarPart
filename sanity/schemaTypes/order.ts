import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [{ type: "orderItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "total",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "paidAt",
      type: "datetime"
    })
  ],
  preview: {
    select: {
      title: "status",
      subtitle: "createdAt",
    },
  },
});
