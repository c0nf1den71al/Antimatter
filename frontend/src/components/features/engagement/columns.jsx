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

import { Tag } from "@/components/shared/tag"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useData } from "@/providers/data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

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
                        <Tag variant="purple">{originalRow.severity}</Tag>
                    </div>
                )
            } else if (originalRow.severity === "high") {
                return (
                    <div className="flex pl-4">
                        <Tag variant="red">{originalRow.severity}</Tag>
                    </div>
                )
            } else if (originalRow.severity === "moderate") {
                return (
                    <div className="flex pl-4">
                        <Tag variant="amber">{originalRow.severity}</Tag>
                    </div>
                )
            } else if (originalRow.severity === "low") {
                return (
                    <div className="flex pl-4">
                        <Tag variant="blue">{originalRow.severity}</Tag>
                    </div>
                )
            } else {
                return (
                    <div className="flex pl-4">
                        <Tag variant="gray">{originalRow.severity}</Tag>
                    </div>
                )
            }
        }
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const originalRow = row.original
            const {findings, setFindings } = useData()
            const { toast } = useToast()
            const router = useRouter()
            const deleteFinding = async (findingId) => {
                try {
                    const res = await fetch(`/api/findings/${table.options.meta.engagementId}/${findingId}`, { method: "DELETE" })
                    const data = await res.json()
                        
                    setFindings(findings.filter(finding =>
                        finding._id !== findingId
                    ))
                    toast({ description: `Finding "${originalRow.findingIdentifier}" has been deleted.` })

                } catch (error) {
                    console.log(error)
                }
            }

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
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/engagements/${table.options.meta.engagementId}/findings/${originalRow._id}`) }}>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(originalRow.findingIdentifier) }}>Copy identifier</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Severity</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={originalRow.severity}>
                                    {["Critical", "High", "Moderate", "Low", "Informational"].map((status) => (
                                        <DropdownMenuRadioItem key={originalRow.id} value={status.toLocaleLowerCase()}>
                                            {status}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); deleteFinding(originalRow._id)}}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableHiding: false,
    },
]
