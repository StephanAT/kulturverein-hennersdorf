import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Seite",
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
      name: "body",
      title: "Inhalt",
      type: "blockContent",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-Beschreibung",
      type: "text",
      rows: 3,
      description: "Kurze Beschreibung für Suchmaschinen (max. 160 Zeichen)",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage" },
  },
});
