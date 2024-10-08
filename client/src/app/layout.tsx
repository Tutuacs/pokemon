import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { NavbarProvider } from "@/components/NavBarProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokéRolls",
  description: "Collect your favorite pokémons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <Providers>
          <NavbarProvider>{children}</NavbarProvider>
        </Providers>
      </body>
    </html>
  );
}
