import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import BrandLogo from "@/components/Business/BrandLogo";
import LocationModal from "@/components/Business/LocationModal";

const NavbarComponent = () => {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <BrandLogo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          {/* <LocationModal  /> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
