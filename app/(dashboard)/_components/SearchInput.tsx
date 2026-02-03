"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import qs from "query-string";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue("", 500);
  
  // Track focus state for styling
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setDebouncedValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      {/* Container wrapper for the animation effects.
        When focused:
        1. scale-105: Gives the "hover" / pop-out effect.
        2. shadow-2xl: Adds a deep shadow to emphasize depth.
      */}
      <div 
        className={cn(
          "relative flex items-center w-full transition-all duration-300 ease-out rounded-md bg-white",
          isFocused ? "scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50" : "shadow-sm"
        )}
      >
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
        <Input
          className="w-full pl-9 border-muted-foreground/20 focus-visible:ring-0 focus-visible:border-transparent bg-transparent"
          placeholder="Search boards"
          onChange={handleChange}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};