import { cn } from "@/lib/utils";
import { Star, FileText, LayoutTemplate } from "lucide-react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
  type?: string;
}

export const Footer = ({
  title,
  authorLabel,
  createdLabel,
  isFavorite,
  onClick,
  disabled,
  type
}: FooterProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  const Icon = type === "document" ? FileText : LayoutTemplate;

  return (
    // Updated border-t to be visible
    <div className="relative bg-white/60 dark:bg-black/40 backdrop-blur-md p-3 border-t border-zinc-300/50 dark:border-white/20">
      <div className="flex items-center gap-x-2 mb-1">
        <Icon className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
        <p className="text-[13px] truncate max-w-[calc(100%-20px)] font-medium text-black/80 dark:text-white/90">
          {title}
        </p>
      </div>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-muted-foreground truncate">
        {authorLabel}, {createdLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 text-muted-foreground hover:text-indigo-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavorite && "fill-indigo-600 text-indigo-600"
          )}
        />
      </button>
    </div>
  );
};