import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "360° Panoramen - Kulturverein Hennersdorf",
  description:
    "Virtueller Rundgang durch Hennersdorf mit 26 interaktiven 360-Grad-Panoramen, Audioguides und Hintergrundmusik.",
};

export default function PanoramenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
