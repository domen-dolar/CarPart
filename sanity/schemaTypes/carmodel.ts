import { defineType, defineField } from "sanity";

export default defineType({
  name: "carModel",
  title: "Car Model",
  type: "document",
  fields: [
    defineField({
      name: "make",
      title: "Make",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yearFrom",
      title: "Year From",
      type: "number",
    }),
    defineField({
      name: "yearTo",
      title: "Year To",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "model",
      subtitle: "make",
    },
  },
});
