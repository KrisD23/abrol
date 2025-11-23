import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Abrol Associates",
  description:
    "Expert legal guidance tailored to your needs, for individuals and businesses alike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <body
        className={`${bebasNeue.variable} antialiased`}
        // style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
