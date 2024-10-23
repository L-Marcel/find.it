import type { Metadata } from "next";
import { Inter, Roboto, Tilt_Warp as TiltWarp } from "next/font/google";
import "./globals.scss";
import Provider from "@/context/provider";
import { getCities } from "@/context/cities";

const roboto = Roboto({
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
});

const inter = Inter({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
});

const tiltWarp = TiltWarp({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tilt-warp",
});

export const metadata: Metadata = {
  title: "Find.it",
  description: "Encontre o que procura...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cities = await getCities();

  return (
    <html lang="en">
      <body
        id="page"
        className={`${roboto.variable} ${inter.variable} ${tiltWarp.variable} antialiased`}
      >
        <Provider cities={cities}>{children}</Provider>
      </body>
    </html>
  );
}
