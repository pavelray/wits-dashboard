import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wits - Dashboard",
  description: "Dashboad for Wits to track network activities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <main className="bg-gray-100 min-h-screen">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
