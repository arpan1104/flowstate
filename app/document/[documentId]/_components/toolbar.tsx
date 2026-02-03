"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Highlighter,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code2, // Added for Code Block
  Minus, // Added for Horizontal Separator
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  CheckSquare,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";

interface ToolbarProps {
  editor: Editor | null;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  isActive?: boolean;
  icon: any;
  label: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className={`h-8 w-8 p-0 ${isActive ? "bg-accent text-accent-foreground" : ""}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-white px-2 py-1 sticky top-0 z-20">
      {/* History */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} label="Undo" />
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} label="Redo" />
      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Headings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Type className="h-4 w-4" />
            <span className="text-sm">Heading</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1 Heading</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2 Heading</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3 Heading</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Basic Formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} icon={Bold} label="Bold" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} icon={Italic} label="Italic" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} icon={Strikethrough} label="Strikethrough" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")} icon={Code} label="Inline Code" />
      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Colors */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-8 items-center gap-1 rounded-md border px-1">
              <Highlighter className="h-4 w-4 text-muted-foreground" />
              <Input
                type="color"
                value={editor.getAttributes("highlight").color || "#ffff00"}
                onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
                className="h-6 w-8 p-0 border-none"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>Highlights</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} icon={AlignLeft} label="Align Left" />
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} icon={AlignCenter} label="Align Center" />
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} icon={AlignRight} label="Align Right" />
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} isActive={editor.isActive({ textAlign: "justify" })} icon={AlignJustify} label="Justify" />
      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists & Advanced Blocks */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} icon={List} label="Bullet List" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} icon={ListOrdered} label="Ordered List" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive("taskList")} icon={CheckSquare} label="Task List" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} icon={Quote} label="Blockquote" />
      
      {/* --- ADDED: Code Block & Separator --- */}
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
        isActive={editor.isActive("codeBlock")} 
        icon={Code2} 
        label="Code Block" 
      />
      <ToolbarButton 
        onClick={() => editor.chain().focus().setHorizontalRule().run()} 
        icon={Minus} 
        label="Insert Horizontal Separator" 
      />
      {/* ------------------------------------- */}

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Link & Image */}
      <ToolbarButton onClick={setLink} isActive={editor.isActive("link")} icon={LinkIcon} label="Add Link" />
      <ToolbarButton onClick={addImage} icon={ImageIcon} label="Add Image" />
    </div>
  );
}