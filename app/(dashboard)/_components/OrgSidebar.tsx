"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  const buttonClass = (isActive: boolean) => cn(
    "h-auto py-3 px-4 font-normal justify-start w-full mb-2 transition-all duration-200 border border-transparent",
    "bg-transparent text-zinc-100 hover:text-white",
    "hover:bg-white/10 hover:border-white/20 hover:shadow-sm",
    isActive && "bg-white/20 border-white/30 text-white font-medium shadow-sm"
  );

  return (
    // CHANGED: Added bg-gradient-to-b from original blue to slightly darker blue
    <div className="hidden lg:flex flex-col space-y-6 w-[220px] px-5 pt-5 bg-gradient-to-b from-[#234C6A] to-[#163248] h-full items-center border-r border-white/5 shadow-xl z-[1]">
      <Link href="/">
        <div className="flex items-center justify-center gap-x-2 opacity-90 hover:opacity-100 transition-opacity w-full">
          <Image src="/logo.svg" alt="Logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl text-white", font.className)}>
            Flowstate
          </span>
        </div>
      </Link>
      
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
            },
            organizationSwitcherTrigger: cn(
              "flex w-full items-center justify-between rounded-lg px-4 py-3", 
              "border border-white/10 bg-white/5 text-white backdrop-blur-sm",
              "transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:bg-white/20 hover:border-white/20",
            ),
            organizationPreviewMainIdentifier: "font-semibold text-base text-white truncate max-w-[100px]",
            organizationPreviewSecondaryIdentifier: "text-zinc-300 truncate",
            avatarBox: "border-2 border-white/20"
          },
        }}
      />
      
      <div className="space-y-1 w-full">
        <Button
          asChild
          variant="ghost" 
          className={buttonClass(!!favorites)}
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">Team boards</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className={buttonClass(!!favorites)}
        >
          <Link href={{ query: { favorites: true } }}>
            <Star className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">Favorite boards</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};