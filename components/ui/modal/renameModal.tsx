"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/useRenameModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const RenameModal = () => {
  // Get state from the store
  const { isOpen, onClose, initialValues } = useRenameModal();
  
  // Local state for the input field
  const [title, setTitle] = useState(initialValues.title);
  
  // Mutation hook
  const update = useMutation(api.board.update);
  const [pending, setPending] = useState(false);

  // Sync local state when the modal opens with a new board
  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setPending(true);

    update({
      id: initialValues.id as any,
      title: title.trim(),
    })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to rename board");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* FIX: Added max-w-[480px] to prevent it from filling the screen.
         Added onClick stopPropagation to prevent clicks passing through to the board list.
      */}
      <DialogContent 
        onClick={(e) => e.stopPropagation()}
        className="max-w-[480px] w-full bg-white dark:bg-gray-900 border-none shadow-lg rounded-lg p-6"
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold">
            Edit board title
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter a new title for this board
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
            className="w-full border-zinc-300 dark:border-zinc-700 focus-visible:ring-transparent focus-visible:border-indigo-500"
          />
          
          <DialogFooter className="flex items-center gap-x-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button 
              disabled={pending}
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};