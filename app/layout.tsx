/*
  RootLayout komponenta je glavna "layout" komponenta za Next.js aplikacijo.
  - Definira globalne nastavitve HTML in body taga.
  - Vključuje globalne CSS stile.
  - Naloži lokalno font datoteko ComicRelief za celotno aplikacijo.
*/

import type { Metadata } from "next";
import LocalFont from 'next/font/local';
import "./globals.css";

// Nastavitev lokalnega fonta ComicRelief
const comicRelief = LocalFont({
  src: [
    {
      path: './fonts/ComicRelief-Regular.ttf',  // normalna debelina
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/ComicRelief-Bold.ttf', // krepka verzija
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--font-comicrelief',   // CSS spremenljivka za uporabo fonta
})

// Metadata za aplikacijo
export const metadata: Metadata = {
  title: "CarPart",
  description: "Your top online shop for car parts.",
};

// RootLayout komponenta
export default function RootLayout({
  children,   // vse pod-komponente bodo vstavljene tukaj
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comicRelief.variable}>
      {/* HTML tag z nastavljenim lokalnim fontom */}
      <body>
        {children}
        {/* Vse komponente strani se renderajo tukaj */}
      </body>
    </html>
  );
}
