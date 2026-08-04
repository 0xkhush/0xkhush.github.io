import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "0xkhush — Code in Motion",
  description: "The portfolio of Khushvendra Singh, a software developer and backend AI engineer.",
  openGraph: { images: ["/og.png"] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
