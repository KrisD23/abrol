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
import Footer from "@/components/Footer";
// import NavigationBlocker from "@/components/NavigationBlocker";

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
      <head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bungee&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Pixelify+Sans:wght@400..700&family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" /> */}
      </head>
      <body
        className={`${dmSerifDisplay.variable} ${dmSans.variable} ${libertinusSerif.variable} ${bungee.variable} ${orbitron.variable} ${abrilFatface.variable} antialiased`}
        style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        {/* <NavigationBlocker /> */}
        {children}
      </body>
    </html>
  );
}
