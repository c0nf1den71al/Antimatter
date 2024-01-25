"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"


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
        accessorKey: "findingIdentifier",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Finding Identifier
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow.findingIdentifier}</p>
            )
        },
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
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow.title}</p>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow.status}</p>
            )
        },
    },
    {
        accessorKey: "severity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Severity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original

            if (originalRow.severity === "critical") {
                return (
                    <div className="flex pl-4">
                        <div className="bg-purple-100 rounded px-2 py-1/2">
                            <p className="text-purple-700 uppercase">{originalRow.severity}</p>
                        </div>
                    </div>
                )
            } else if (originalRow.severity === "high") {
                return (
                    <div className="flex pl-4">
                        <div className="bg-red-100 rounded px-2 py-1/2">
                            <p className="text-red-700 uppercase">{originalRow.severity}</p>
                        </div>
                    </div>
                )
            } else if (originalRow.severity === "medium") {
                return (
                    <div className="flex pl-4">
                        <div className="bg-amber-100 rounded px-2 py-1/2">
                            <p className="text-amber-700 uppercase">{originalRow.severity}</p>
                        </div>
                    </div>
                )
            } else if (originalRow.severity === "low") {
                return (
                    <div className="flex pl-4">
                        <div className="bg-blue-100 rounded px-2 py-1/2">
                            <p className="text-blue-700 uppercase">{originalRow.severity}</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="flex pl-4">
                        <div className="bg-gray-100 rounded px-2 py-1/2">
                            <p className="text-gray-700 uppercase">{originalRow.severity}</p>
                        </div>
                    </div>
                )
            }
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const originalRow = row.original

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
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(originalRow.engagementIdentifier)}}>Copy engagement identifier</DropdownMenuItem>
                        <DropdownMenuItem>View Client</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={originalRow.status}>
                                    {["Pending", "In Progress", "Complete", "Delayed"].map((status) => (
                                        <DropdownMenuRadioItem key={originalRow.id} value={status.toLocaleLowerCase()}>
                                            {status}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableHiding: false,
    },
]
