import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Teammitglied",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle / Funktion",
      type: "string",
      description: "z.B. Obmann, Schriftführer, Kassier, Schauspieler:in",
    }),
    defineField({
      name: "bio",
      title: "Kurzbiografie",
      type: "blockContent",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      description: "Niedrigere Zahlen werden zuerst angezeigt",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
