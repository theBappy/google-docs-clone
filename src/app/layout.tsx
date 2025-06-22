import type { Metadata } from "next";
import { Jost } from 'next/font/google'
import "./globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const jost = Jost({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Google Docs@theBappy",
  description: "Tried Cloning google docs with nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={jost.className}
      >
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
