import type { Metadata } from "next";
import {
  DM_Serif_Display,
  DM_Sans,
  Libertinus_Serif,
  Bungee,
  Orbitron,
  Abril_Fatface,
} from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const libertinusSerif = Libertinus_Serif({
  variable: "--font-libertinus-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
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
        className={`${dmSerifDisplay.variable} ${dmSans.variable} ${libertinusSerif.variable} ${bungee.variable} ${orbitron.variable} ${abrilFatface.variable} antialiased`}
        style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
