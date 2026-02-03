"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Avatars = () => {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex items-center gap-2 -space-x-4">
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} className="border-2 border-white ring-1 ring-gray-200 h-8 w-8">
            <AvatarImage src={info?.picture} />
            <AvatarFallback className="text-xs bg-blue-500 text-white">
              {info?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
        );
      })}

      {currentUser && (
        <Avatar className="border-2 border-white ring-1 ring-gray-200 h-8 w-8">
          <AvatarImage src={currentUser.info?.picture} />
          <AvatarFallback className="text-xs bg-amber-500 text-white">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};