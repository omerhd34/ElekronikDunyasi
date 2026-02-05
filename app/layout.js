import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata = {
 title: "Elektronik Dünyası",
 description: "Elektronik dünyanızın adresi",
};

export default function RootLayout({ children }) {
 return (
  <html lang="tr">
   <body className={`${geistMono.variable} antialiased`}>
    {children}
   </body>
  </html>
 );
}
