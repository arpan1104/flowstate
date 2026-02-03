import { Room } from "@/components/Room";
import { Canvas } from "./_components/Canvas";
import  Loading from "@/components/auth/Loading";
import { use } from "react";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  // In Next.js 15, route params are Promises that must be unwrapped
  const resolvedParams = use(params);

  return (
    <Room roomId={resolvedParams.boardId} fallback={<Loading />}>
      <Canvas boardId={resolvedParams.boardId} />
    </Room>
  );
};

export default BoardIdPage;