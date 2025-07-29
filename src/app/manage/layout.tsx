import DarkModeToggle from "@/components/dark-mode-toggle";
import React from "react";
import DropdownAvatar from "./dropdown-avatar";
import MobileNavLinks from "./mobile-nav-links";
import NavLinks from "./nav-links";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <NavLinks></NavLinks>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNavLinks />
          <div className="relative ml-auto flex-1 md:grow-0">
            <div className="flex justify-end">
              <DarkModeToggle />
            </div>
          </div>
          <DropdownAvatar />
        </header>
        {children}
      </div>
    </div>
  );
};

export default layout;
