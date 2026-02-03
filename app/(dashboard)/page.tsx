"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./_components/EmptyOrg";
import { BoardList } from "./_components/board-list";
import { use } from "react";

// In Next.js 15, searchParams must be typed as a Promise
interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();
  // Unwrap the params using React 19 'use' hook
  const params = use(searchParams);

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={params} />
      )}
    </div>
  );
};

export default DashboardPage;