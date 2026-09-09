import { defineConfig } from "tinacms";

/**
 * Client editing portal.
 *
 * Content lives in content/pages/*.json and is committed to git, so every
 * client edit is a normal commit that Vercel redeploys. No database, no
 * vendor lock-in: if Tina ever goes away the JSON is still right there.
 *
 * Field labels are written for the client, not for us. Shabana should never
 * see a key name.
 */

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "event",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "page",
        label: "Website Pages",
        path: "content/pages",
        format: "json",
        ui: {
          // One fixed page for now. Client should not be able to delete it.
          allowedActions: { create: false, delete: false },
        },
        fields: [
          // ——— Hero ———
          {
            type: "object",
            name: "hero",
            label: "Top of the Page",
            fields: [
              { type: "string", name: "kicker", label: "Small line above the headline" },
              { type: "string", name: "headlineTop", label: "Headline, first part (black text)" },
              { type: "string", name: "headlineAccent", label: "Headline, second part (gold text)" },
              { type: "string", name: "location", label: "Location line" },
              { type: "string", name: "date", label: "Date line" },
              {
                type: "string",
                name: "lines",
                label: "Three short lines",
                list: true,
              },
              { type: "image", name: "image", label: "Photo, left (women)" },
              {
                type: "string",
                name: "imageAlt",
                label: "Left photo description (for screen readers and Google)",
              },
              { type: "image", name: "imageSecondary", label: "Photo, right (men)" },
              {
                type: "string",
                name: "imageSecondaryAlt",
                label: "Right photo description",
              },
              { type: "string", name: "ctaPrimaryLabel", label: "Gold button text" },
              { type: "string", name: "ctaPrimaryHref", label: "Gold button link" },
              { type: "string", name: "ctaSecondaryLabel", label: "Outline button text" },
              { type: "string", name: "ctaSecondaryHref", label: "Outline button link" },
            ],
          },

          // ——— Scrolling band ———
          {
            type: "string",
            name: "marquee",
            label: "Scrolling gold band",
            list: true,
          },

          // ——— Road to LA ———
          {
            type: "object",
            name: "qualify",
            label: "Road to LA Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Small gold label" },
              { type: "string", name: "headline", label: "Headline, first part (black text)" },
              { type: "string", name: "headlineAccent", label: "Headline, second part (gold text)" },
              {
                type: "string",
                name: "body",
                label: "Paragraph",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Photo" },
              { type: "string", name: "imageAlt", label: "Photo description" },
            ],
          },

          // ——— Cities ———
          {
            type: "object",
            name: "cities",
            label: "The Three Cities",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ?? "City" }),
            },
            fields: [
              { type: "string", name: "name", label: "City name" },
              { type: "string", name: "tagline", label: "Gold italic line" },
              {
                type: "string",
                name: "desc",
                label: "Short description",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Photo" },
              { type: "string", name: "alt", label: "Photo description" },
            ],
          },

          // ——— History ———
          {
            type: "object",
            name: "history",
            label: "History Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label" },
              { type: "string", name: "headline", label: "Headline, first part (black text)" },
              { type: "string", name: "headlineAccent", label: "Headline, second part (gold text)" },
              {
                type: "string",
                name: "body",
                label: "Paragraph",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Photo" },
              { type: "string", name: "alt", label: "Photo description" },
            ],
          },
          {
            type: "object",
            name: "historyProof",
            label: "History Numbers",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.value ?? "Number" }),
            },
            fields: [
              { type: "string", name: "value", label: "Big gold number" },
              { type: "string", name: "label", label: "What it means" },
            ],
          },
          {
            type: "object",
            name: "timeline",
            label: "Timeline",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: [item?.year, item?.title].filter(Boolean).join(" · ") || "Entry",
              }),
            },
            fields: [
              { type: "string", name: "year", label: "Year" },
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },

          // ——— Sponsors ———
          {
            type: "object",
            name: "partner",
            label: "Sponsors Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Small gold label" },
              { type: "string", name: "headline", label: "Headline, first part" },
              { type: "string", name: "headlineAccent", label: "Headline, second part (gold text)" },
              {
                type: "string",
                name: "body",
                label: "Paragraph",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "partnerTiers",
            label: "Sponsorship Packages",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ?? "Package" }),
            },
            fields: [
              { type: "string", name: "name", label: "Package name" },
              {
                type: "string",
                name: "desc",
                label: "Short description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "includes",
                label: "What is included",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
