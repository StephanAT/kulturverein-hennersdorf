import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Martha Theater", value: "martha-theater" },
          { title: "Kasperltheater", value: "kasperltheater" },
          { title: "Dorferneuerung", value: "dorferneuerung" },
          { title: "Schulprojekt", value: "schulprojekt" },
          { title: "Sonstiges", value: "other" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Detailbeschreibung",
      type: "blockContent",
    }),
    defineField({
      name: "mainImage",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternativtext",
        },
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "Externe Website",
      type: "url",
      description: "z.B. martha-theater.at",
    }),
    defineField({
      name: "isActive",
      title: "Aktiv",
      type: "boolean",
      initialValue: true,
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
    select: { title: "title", subtitle: "category", media: "mainImage" },
  },
});
