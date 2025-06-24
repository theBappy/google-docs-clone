"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";


interface MenuItemProps{
  data: Doc<'documents'>;
}

export const MenuItem = ({data}:MenuItemProps) => {
  const router = useRouter()
  const { editor } = useEditorStore();
  const mutation = useMutation(api.documents.create)

  const onNewDocument = () => {
    mutation({
      title: 'Untitled document',
      initialContent: ''
    })
    .catch(() => toast.error('Something went wrong') )
    .then((id) =>{
      toast.success('Document created')
      router.push(`/documents/${id}`)
    })
  }

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`); 
  };
  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `${data.title}.html`); 
  };
  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `${data.title}.txt`);
  };

  return (
      <div className="flex">
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
          {/* File Menu */}
          <MenubarMenu>
            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
              File
            </MenubarTrigger>
            <MenubarContent className="print:hidden">
              <MenubarSub>
                <MenubarSubTrigger>
                  <FileIcon className="size-4 mr-2" />
                  Save
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={onSaveJSON}>
                    <FileJsonIcon className="size-4 mr-2" />
                    JSON
                  </MenubarItem>
                  <MenubarItem onClick={onSaveHTML}>
                    <GlobeIcon className="size-4 mr-2" />
                    HTML
                  </MenubarItem>
                  <MenubarItem onClick={() => window.print()}>
                    <BsFilePdf className="size-4 mr-2" />
                    PDF
                  </MenubarItem>
                  <MenubarItem onClick={onSaveText}>
                    <FileTextIcon className="size-4 mr-2" />
                    Text
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem
              onClick={onNewDocument}
              >
                <FilePlusIcon className="size-4 mr-2" />
                New Document
              </MenubarItem>
              <MenubarSeparator />
              <RenameDialog documentId={data._id} initialTitle={data.title}>
              <MenubarItem
              onClick={(e) => e.stopPropagation()}
              onSelect={(e) => e.preventDefault()}
              >
                <FilePenIcon />
                Rename
              </MenubarItem>
              </RenameDialog>
              <RemoveDialog documentId={data._id}>
              <MenubarItem
              onClick={(e) => e.stopPropagation()}
              onSelect={(e) => e.preventDefault()}
              >
                <TrashIcon />
                Remove
              </MenubarItem>
              </RemoveDialog>
              <MenubarSeparator />
              <MenubarItem onClick={() => window.print()}>
                <PrinterIcon className="size-4 mr-2" />
                Print
                <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* Edit Menu */}
          <MenubarMenu>
            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
              Edit
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                <Undo2Icon className="size-4 mr-2" />
                Undo
                <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                <Redo2Icon className="size-4 mr-2" />
                Redo
                <MenubarShortcut>⌘Y</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* Insert Menu */}
          <MenubarMenu>
            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
              Insert
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Table</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 1, cols: 1 })}
                  >
                    1 x 1
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 2, cols: 2 })}
                  >
                    2 x 2
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 3, cols: 3 })}
                  >
                    3 x 3
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 4, cols: 4 })}
                  >
                    4 x 4
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 5, cols: 5 })}
                  >
                    5 x 5
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 6, cols: 6 })}
                  >
                    6 x 6
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>

          {/* Format Menu */}
          <MenubarMenu>
            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
              Format
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>
                  <TextIcon className="size-4 mr-2" />
                  Text
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                  >
                    <BoldIcon className="size-4 mr-2" />
                    Bold
                    <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                  >
                    <ItalicIcon className="size-4 mr-2" />
                    Italic
                    <MenubarShortcut>⌘I</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().toggleUnderline().run()
                    }
                  >
                    <UnderlineIcon className="size-4 mr-2" />
                    Underline
                    <MenubarShortcut>⌘U</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                  >
                    <StrikethroughIcon className="size-4 mr-2" />
                    Strike
                    <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem
                onClick={() => editor?.chain().focus().unsetAllMarks().run()}
              >
                <RemoveFormattingIcon className="size-4 mr-2" />
                Clear Formatting
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        </div>
  );
};
