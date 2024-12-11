import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookSearcher",
  description: "Find a book with just a simple search!",
  icons: {
    icon: '/logo.png'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  );
}
