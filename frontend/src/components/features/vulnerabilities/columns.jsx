"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown, MoreHorizontal, Check } from "lucide-react"

import { getSession } from "next-auth/react"
import { useData } from "@/providers/data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { stripTrailingSlash } from "@/lib/utils"

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
        accessorKey: "vulnerabilityIdentifier",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vulnerability Identifier
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="pl-4 uppercase">{originalRow.vulnerabilityIdentifier}</p>
            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const originalRow = row.original
            return (
                <p className="text-gray-700 pl-4">{originalRow?.category ? originalRow.category : "No Category"}</p>
            )
        }
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
        id: "actions",
        cell: ({ row }) => {
            const originalRow = row.original
            const { vulnerabilities, setVulnerabilities } = useData()
            const { toast } = useToast()
            const router = useRouter()

            const deleteVulnerability = async (vulnerabilityId) => {
                try {
                    const session = await getSession()
                    fetch(`${stripTrailingSlash(process.env.NEXT_PUBLIC_ANTIMATTER_API_URL)}/api/vulnerabilities/${vulnerabilityId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${session.accessToken}`,
                        }
                    }).then((res) => res.json())
                        .then((data) => {
                            setVulnerabilities(vulnerabilities.filter(vulnerability =>
                                vulnerability._id !== vulnerabilityId
                            ))
                            toast({ description: `Vulnerability "${data.vulnerabilityIdentifier}" has been deleted.` })
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
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); router.push(`/dashboard/vulnerability/${originalRow._id}`)}}>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(originalRow.vulnerabilityIdentifier)}}>Copy identifier</DropdownMenuItem>
                        <DropdownMenuSeparator />        
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); deleteVulnerability(originalRow._id)}}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableHiding: false,
    },
]