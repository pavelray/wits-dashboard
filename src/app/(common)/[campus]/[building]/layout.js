"use client"
import BuildingLayoutComponent from "@/components/Business/BuildingStats/BuildingLayout";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";

export default function BuildingLayout({ children }){
  const pathname = usePathname();
  return (
    <Fragment>
      <BuildingLayoutComponent pathname={pathname}>{children}</BuildingLayoutComponent>
    </Fragment>
  );
};

