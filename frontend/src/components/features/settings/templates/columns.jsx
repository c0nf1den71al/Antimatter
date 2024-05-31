"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal, Check } from "lucide-react";

import { useData } from "@/providers/data-provider";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onClick={(e) => e.stopPropagation()}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originalRow = row.original;
      return (
        <p className="text-gray-700 pl-4">
          {originalRow?.metadata?.title
            ? originalRow?.metadata?.title
            : "No Title"}
        </p>
      );
    },
  },
  {
    accessorKey: "filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originalRow = row.original;
      return <p className="pl-4">{originalRow?.filename}</p>;
    },
  },
  {
    accessorKey: "uploadDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Upload Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originalRow = row.original;
      const date = new Date(originalRow?.uploadDate);
      return <p className="pl-4">{date.toUTCString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const originalRow = row.original;
      const { templates, setTemplates } = useData();
      const { toast } = useToast();
      const router = useRouter();

      const deleteTemplate = async (templateId) => {
        try {
          const res = await fetch(`/api/templates/${templateId}`, {
            method: "DELETE",
          });

          const data = await res.json();

          setTemplates(
            templates.filter((template) => template._id !== templateId),
          );

          toast({
            description: `Template "${data.metadata.title}" has been deleted.`,
          });
        } catch (error) {
          console.log(error);
        }
      };

      const downloadTemplate = async (templateId) => {
        try {
          const res = await fetch(`/api/templates/${templateId}`, {
            method: "GET",
          });

          if (!res.ok) {
            throw new Error("Failed to download file");
          }

          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const contentDisposition = res.headers.get("Content-Disposition");
          const filename = contentDisposition
            ? contentDisposition.split("filename=")[1].replace(/['"]/g, "")
            : "downloaded_file";

          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();

          // Revoke the object URL after the download
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                downloadTemplate(originalRow._id);
              }}
            >
              Download Template
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                deleteTemplate(originalRow._id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
