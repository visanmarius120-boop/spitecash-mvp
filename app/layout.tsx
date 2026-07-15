import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpiteCash — Submit your case",
  description:
    "Cancel any subscription with our free step-by-step guides. Submit proof if you were charged after a free trial — valid cases get €3 guaranteed.",
  verification: {
    other: {
      "impact-site-verification": "a6694be4-189f-4c07-8bc3-3a47a02a69aa",
    },
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
