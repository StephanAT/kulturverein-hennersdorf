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
      description: "Optional: Falls die Veranstaltung \u00FCber mehrere Tage geht",
    }),
    defineField({
      name: "location",
      title: "Ort",
      type: "string",
      description: "Name des Veranstaltungsortes (z.B. Kulturzentrum 9er Haus)",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
      description: "Exakte Adresse f\u00FCr Kartenanzeige (z.B. Bachgasse 9, 2332 Hennersdorf)",
    }),
    defineField({
      name: "description",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bodyHtml",
      title: "Detailbeschreibung (HTML)",
      type: "text",
      rows: 10,
      description: "Rich-Text-Inhalt als HTML (vom Dashboard-Editor)",
    }),
    defineField({
      name: "body",
      title: "Detailbeschreibung (Block)",
      type: "blockContent",
      description: "Alternativ: Rich Text \u00FCber Sanity Studio",
    }),
    defineField({
      name: "image",
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
      name: "gallery",
      title: "Bildergalerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternativtext",
            },
          ],
        },
      ],
      description: "Weitere Bilder zum Event (werden als Galerie am Seitenende angezeigt)",
    }),
    defineField({
      name: "price",
      title: "Eintritt / Preis",
      type: "string",
      description: "z.B. \u201EFreier Eintritt\u201C, \u201E15 \u20AC\u201C, \u201EFreiwillige Spende\u201C",
    }),
    defineField({
      name: "organizer",
      title: "Veranstalter",
      type: "string",
      description: "z.B. Kulturverein Hennersdorf, Martha Theater",
    }),
    defineField({
      name: "contact",
      title: "Kontakt",
      type: "string",
      description: "E-Mail oder Telefon f\u00FCr R\u00FCckfragen",
    }),
    defineField({
      name: "externalLink",
      title: "Externer Link",
      type: "url",
      description: "Link zu Ticket-Shop, martha-theater.at, etc.",
    }),
    defineField({
      name: "project",
      title: "Projekt",
      type: "reference",
      to: [{ type: "project" }],
      description: "Zugeh\u00F6riges Projekt (z.B. Martha Theater)",
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
