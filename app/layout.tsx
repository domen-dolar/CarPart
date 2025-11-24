import type { Metadata } from "next";
import LocalFont from 'next/font/local';
import "./globals.css";

const comicRelief = LocalFont({
  src: [
    {
      path: './fonts/ComicRelief-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/ComicRelief-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--font-comicrelief',
})

export const metadata: Metadata = {
  title: "CarPart",
  description: "Your top online shop for car parts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comicRelief.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
