import { Room } from "@/components/Room";
import { DocumentEditor } from "./_components/document-editor";
import  Loading  from "@/components/auth/Loading";
import { use } from "react";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const resolvedParams = use(params);

  return (
    <Room roomId={resolvedParams.documentId} fallback={<Loading />}>
      <DocumentEditor documentId={resolvedParams.documentId} />
    </Room>
  );
};

export default DocumentIdPage;