import type { Metadata } from "next";
import { Inter, Roboto, Tilt_Warp as TiltWarp } from "next/font/google";
import "./globals.scss";
import Provider from "@/context/provider";
import { cityToString, getCities } from "@/context/cities";
import { Toaster } from "@/components/ui/sonner";

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
        className={`${roboto.variable} ${inter.variable} ${tiltWarp.variable} antialiased`}
      >
        <Provider cities={cities.map((city) => cityToString(city))}>
          {children}
          <footer>
            <p>© {new Date().getFullYear()} Find.it</p>
            <p>
              Find.it é código aberto, veja no{" "}
              <a
                href="http://github.com/l-marcel/find.it"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              !
            </p>
          </footer>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
