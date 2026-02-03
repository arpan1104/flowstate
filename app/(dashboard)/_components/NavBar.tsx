"use client";

import { UserButton, OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { SearchInput } from "./SearchInput";
import { InviteButton } from "./InviteButton";

export const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center gap-x-4 p-5 relative">
      {/* Centered Search Bar */}
      <div className="hidden lg:flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] z-[40]">
        <SearchInput />
      </div>

      {/* Mobile Organization Switcher */}
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>

      {/* Right Side Actions - Pushed to the right */}
      <div className="ml-auto flex items-center gap-x-4">
        {organization && <InviteButton />}
        <UserButton />
      </div>
    </div>
  );
};