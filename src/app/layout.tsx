import type { Metadata } from "next";
import { Quicksand, Roboto } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kulturverein Hennersdorf",
  description:
    "Gemeinnütziger Hennersdorfer Kulturverein - Kultur, Theater, Gemeinschaft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${quicksand.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
