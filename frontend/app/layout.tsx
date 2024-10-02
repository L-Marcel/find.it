import type { Metadata } from "next";
import { Roboto, Inter, Tilt_Warp } from "next/font/google";
import "./globals.scss";
import Header from "@/components/header";
import Provider from "@/context/provider";

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

const tiltWarp = Tilt_Warp({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tilt-warp",
});

export const metadata: Metadata = {
  title: "Find.it",
  description: "Encontre o que procura...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${inter.variable} ${tiltWarp.variable} antialiased`}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
