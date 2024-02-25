import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import NavbarComponent from "@/components/UI/Navbar";
import httpService from "@/utils/httpService";
import AppContext, { AppProvider } from "@/context/AppContext";
import { getDefaultLocation } from "@/utils/helperMethods";
import { ClientSessionProvider } from "@/context/ClientSessionContext";

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

async function getClientSessionActivity(campusName, buildingName, floorName) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const startTime = Date.parse(yesterday.toDateString());
  const endTime = Date.parse(today.toDateString());

  const location = `${campusName} > ${buildingName} > ${floorName}`;
  const res = await httpService.post(
    "http://localhost:3000/api/clientSessionDetails",
    {
      body: {
        location: location,
        startTime: startTime,
        endTime: endTime,
        groupBy: "userName",
      },
    }
  );
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  const { data } = res;
  return data;
}

export default async function RootLayout({ children }) {
  const { data } = await getData();
  const { FLOORAREA, BUILDING, CAMPUS, OUTDOORAREA, DEFAULT } = data;
  const { defaultBuildingName, defaultCampusName, defaultFloorName } =
    getDefaultLocation({
      campus: CAMPUS,
      building: BUILDING,
      floor: FLOORAREA,
      outdoor: OUTDOORAREA,
    }) || {};

  const sessionData = await getClientSessionActivity(
    defaultCampusName,
    defaultBuildingName,
    defaultFloorName
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider
          campus={CAMPUS}
          outdoor={OUTDOORAREA}
          building={BUILDING}
          floor={FLOORAREA}
          default={DEFAULT}
          defaultBuildingName={defaultBuildingName}
          defaultCampusName={defaultCampusName}
          defaultFloorName={defaultFloorName}
        >
          <NavbarComponent />
          <main className="min-h-screen">
            <ClientSessionProvider
              clientSessionData={sessionData}
              defaultLocation={{
                campusName: defaultCampusName,
                buildingName: defaultBuildingName,
                floorName: defaultFloorName,
              }}
            >
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ClientSessionProvider>
          </main>
          <footer className="h-40 mx-5">

          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
