import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import NavbarComponent from "@/components/UI/Navbar";
import httpService from "@/utils/httpService";
import AppContext, { AppProvider } from "@/context/AppContext";
import { getDefaultLocation } from "@/utils/helperMethods";
import { ClientDataProvider } from "@/context/ClientSessionContext";
import { getClientFrequency } from "@/utils/clientApiHelper";
import { getSiteMapData } from "@/utils/siteMapApiHelper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wits - Dashboard",
  description: "Dashboad for Wits to track network activities",
};

async function getCampusData() {
  return getSiteMapData();
}

export async function getClientFrequencyData(
  campusName,
  buildingName,
  floorName
) {
  return getClientFrequency(campusName, buildingName, floorName);
}

export default async function RootLayout({ children }) {
  const data = await getCampusData();
  const { DEFAULT_LOCATION } = data;
  const { buildingName, campusName, floorName } = DEFAULT_LOCATION;

  const appProps = {
    ...data,
    buildingName,
    campusName,
    floorName,
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider appProps={appProps}>
          <NavbarComponent />
          <main className="min-h-screen">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <footer className="h-40 mx-5"></footer>
        </AppProvider>
      </body>
    </html>
  );
}
