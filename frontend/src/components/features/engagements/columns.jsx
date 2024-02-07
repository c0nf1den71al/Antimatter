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
import { getSession } from "next-auth/react"
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
        accessorKey: "engagementIdentifier",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Engagement Identifier
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow.engagementIdentifier}</p>
            )
        },
    },
    {
        accessorKey: "client",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow?.clientShortName ? originalRow.clientShortName : originalRow.clientLongName}</p>
            )
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Start Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow.startDate ? new Date(originalRow.startDate).toLocaleDateString("en-GB") : "Date Not Set"}</p>
            )
        },
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    End Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4">{originalRow.endDate ? new Date(originalRow.endDate).toLocaleDateString("en-GB") : "Date Not Set"}</p>
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

            if (originalRow.status === "complete") {
                return (
                    <div className="flex pl-4">
                        <Tag variant="green">{originalRow.status}</Tag>
                    </div>
                )
            } else {
                return (
                    <div className="flex pl-4">
                        <Tag variant="gray">{originalRow.status}</Tag>
                    </div>
                )
            }
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const originalRow = row.original
            const { engagements, setEngagements } = useData()
            const { toast } = useToast()
            const router = useRouter()
            
            const deleteEngagement = async (engagementId) => {
                try {
                    const session = await getSession()
                    fetch(`${process.env.NEXT_PUBLIC_ANTIMATTER_API_URL}/api/engagements/${engagementId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${session.accessToken}`,
                        }
                    }).then((res) => res.json())
                        .then((data) => {
                            setEngagements(engagements.filter(engagement =>
                                engagement._id !== engagementId
                            ))
                            toast({ description: `Engagement "${data.engagementIdentifier}" has been deleted.` })
                        })
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
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); router.push(`/dashboard/engagements/${originalRow._id}`)}}>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(originalRow.engagementIdentifier) }}>Copy identifier</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); router.push(`/dashboard/clients/${originalRow.client}`)}}>View Client</DropdownMenuItem>
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
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); deleteEngagement(originalRow._id)}}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableHiding: false,
    },
]
