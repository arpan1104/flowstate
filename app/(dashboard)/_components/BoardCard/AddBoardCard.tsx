"use client";

import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { Loader2Icon, Plus, LayoutTemplate, FileText, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddBoardCardProps {
  orgId: string;
  disabled?: boolean;
}

export const AddBoardCard = ({ orgId, disabled }: AddBoardCardProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  // State to track dialog open status and the creation wizard steps
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"select" | "name">("select");
  const [selectedType, setSelectedType] = useState<"board" | "document" | null>(null);
  const [title, setTitle] = useState("");

  // Step 1: User selects a type
  const onTypeSelect = (type: "board" | "document") => {
    setSelectedType(type);
    setStep("name"); // Move to Step 2
  };

  // Step 2: User confirms creation
  const handleCreate = () => {
    if (!selectedType || !title.trim()) return;

    mutate({ 
      orgId, 
      title: title.trim(), 
      type: selectedType 
    })
      .then((id) => {
        toast.success(`${selectedType === "board" ? "Board" : "Document"} created`);
        setIsOpen(false);
        // Navigate to the new item
        if (selectedType === "board") {
          router.push(`/board/${id}`);
        } else {
          router.push(`/document/${id}`);
        }
      })
      .catch(() => {
        toast.error("Failed to create");
      });
  };

  // Reset form when dialog closes
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Delay reset slightly to avoid UI flickering while closing
      setTimeout(() => {
        setStep("select");
        setSelectedType(null);
        setTitle("");
      }, 300);
    }
  };

  // Handle Enter key in input
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          disabled={pending || disabled}
          className={cn(
            "bg-blue-600 group aspect-[100/120] border rounded-lg flex flex-col justify-center items-center gap-3",
            (pending || disabled) && "opacity-70 cursor-not-allowed",
            "border-none hover:bg-blue-700 transition-colors"
          )}
        >
          <div className="flex flex-col items-center">
            {pending ? (
              <Loader2Icon className={"text-white h-10 w-10 stroke-1 animate-spin"} />
            ) : (
              <Plus
                className={cn(
                  "text-white h-10 w-10 stroke-1",
                  !disabled &&
                    "group-hover:rotate-90 group-hover:scale-150 duration-500"
                )}
              />
            )}
            <p className="text-white text-sm font-light mt-2">Create New</p>
          </div>
        </button>
      </DialogTrigger>

      {/* Glassmorphism Dialog Style */}
      <DialogContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 sm:max-w-[425px] shadow-2xl">
        
        {/* STEP 1: Select Type */}
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                What would you like to create?
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 justify-center mt-4 pb-2">
              <Button
                variant="outline"
                type="button"
                className="flex flex-col h-32 w-32 gap-3 bg-white/50 border-black/5 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 hover:scale-105 hover:shadow-md"
                onClick={() => onTypeSelect("board")}
              >
                <LayoutTemplate className="h-8 w-8" />
                <span className="font-medium">Board</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex flex-col h-32 w-32 gap-3 bg-white/50 border-black/5 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 hover:scale-105 hover:shadow-md"
                onClick={() => onTypeSelect("document")}
              >
                <FileText className="h-8 w-8" />
                <span className="font-medium">Document</span>
              </Button>
            </div>
          </>
        )}

        {/* STEP 2: Name Input */}
        {step === "name" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                New {selectedType === "board" ? "Board" : "Document"} Title
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <Input 
                autoFocus
                placeholder={`Untitled ${selectedType}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
                disabled={pending}
                onKeyDown={onKeyDown}
                className="bg-white/50 border-black/10 focus-visible:ring-indigo-500"
              />
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between w-full">
              <Button 
                variant="ghost" 
                type="button"
                onClick={() => {
                  setStep("select");
                  setTitle("");
                }}
                disabled={pending}
                className="text-muted-foreground hover:text-black dark:hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                type="button"
                onClick={handleCreate}
                disabled={pending || !title.trim()} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[100px]"
              >
                {pending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};