import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import NavbarComponent from "@/components/UI/Navbar";
import httpService from "@/utils/httpService";
import AppContext, { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wits - Dashboard",
  description: "Dashboad for Wits to track network activities",
};

async function getData() {
  const res = await httpService.get("http://localhost:3000/api/siteMapData");
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res;
}

export default async function RootLayout({ children }) {
  const { data } = await getData();
  const { FLOORAREA, BUILDING, CAMPUS, OUTDOORAREA, DEFAULT } = data;
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider
          campus={CAMPUS}
          outdoor={OUTDOORAREA}
          building={BUILDING}
          floor={FLOORAREA}
          default={DEFAULT}
        >
          <NavbarComponent />
          <main className="min-h-screen">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
