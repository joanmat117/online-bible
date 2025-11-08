import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Biblia Online",
  description: "Una Biblia comoda y accesible rapidamente desde cualquier dispositivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-title" content="Online Bible" />
      </head>
      <body
style={{fontFamily:'"Lato"',minHeight:'100dvh',display:'flex',flexDirection:'column'}}  
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
