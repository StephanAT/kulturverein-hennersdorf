import { defineField, defineType } from "sanity";

export const sponsorType = defineType({
  name: "sponsor",
  title: "Sponsor / Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "tier",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Hauptsponsor", value: "main" },
          { title: "Sponsor", value: "sponsor" },
          { title: "Partner", value: "partner" },
          { title: "Förderer", value: "supporter" },
        ],
      },
      initialValue: "partner",
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
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
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});
