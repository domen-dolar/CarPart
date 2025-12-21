import { defineType, defineField } from "sanity";

export default defineType({
  name: "basket",
  title: "Basket",
  type: "document",
  fields: [
    defineField({
      name: "user",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "orderItem" }],
      initialValue: [],
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
