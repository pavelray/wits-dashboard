import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Business/Header/Header";
import HeaderMobile from "@/components/Business/Header/HeaderMobile";

import { AppProvider } from "@/context/AppContext";
import { getSiteMapData } from "@/utils/siteMapApiHelper";
import SideNav from "@/components/Business/SideNav";
import MarginWidthWrapper from "@/components/UI/MarginWidthWrapper";
import PageWrapper from "@/components/UI/PageWrapper";

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
      <body className="bg-white">
        <AppProvider appProps={appProps}>
          <SideNav />
          <main className="flex-1 min-h-screen">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </PageWrapper>
            </MarginWidthWrapper>
          </main>
          <footer className="h-40 mx-5"></footer>
        </AppProvider>
      </body>
    </html>
  );
}
