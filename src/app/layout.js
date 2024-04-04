import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import NavbarComponent from "@/components/UI/Navbar";

import { AppProvider } from "@/context/AppContext";
import { getSiteMapData } from "@/utils/siteMapApiHelper";

export const metadata = {
  title: "Wits - Dashboard",
  description: "Dashboad for Wits to track network activities",
};

async function getCampusData() {
  return getSiteMapData();
}

export default async function RootLayout({ children }) {
  const { result } = await getCampusData();
  const appProps = {
    ...result,
  };

  return (
    <html lang="en">
      <body>
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
