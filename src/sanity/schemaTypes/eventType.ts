import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Veranstaltung",
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
      name: "date",
      title: "Datum",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Enddatum",
      type: "datetime",
      description: "Optional: Falls die Veranstaltung über mehrere Tage geht",
    }),
    defineField({
      name: "location",
      title: "Ort",
      type: "string",
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
      name: "image",
      title: "Bild",
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
      name: "project",
      title: "Projekt",
      type: "reference",
      to: [{ type: "project" }],
      description: "Zugehöriges Projekt (z.B. Martha Theater)",
    }),
  ],
  orderings: [
    {
      title: "Datum (neueste zuerst)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString("de-AT") : "Kein Datum",
        media,
      };
    },
  },
});
