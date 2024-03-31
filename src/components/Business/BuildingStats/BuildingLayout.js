"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";

const BuildingLayoutComponent = ({ children, pathname }) => {
  const pathNameArr = pathname.split("/").splice(1);
  const getUrl = (path, index) => {
    if (index > 0 && index < pathNameArr.length) {
      return `/${pathNameArr[0]}/${path}`;
    }
  };
  return (
    <div className="md:container md:mx-auto md:my-5">
      <Breadcrumbs variant="light" underline="hover">
        <BreadcrumbItem href="/">Dashboad</BreadcrumbItem>
        {pathNameArr.map((path, index) => {
          return (
            <BreadcrumbItem
              key=""
              isDisabled={index == 0}
              href={getUrl(path, index)}
            >
              {decodeURI(path)}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      {children}
    </div>
  );
};

export default BuildingLayoutComponent;
