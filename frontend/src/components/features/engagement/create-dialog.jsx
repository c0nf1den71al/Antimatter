"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { useData } from "@/providers/data-provider"
import { useState } from "react"

import { getSession } from "next-auth/react"
import { ChevronsUpDown, Check } from "lucide-react"

import { stripTrailingSlash, cn } from "@/lib/utils";

export function CreateDialog() {
    const { toast } = useToast()
    const { vulnerabilities, setVulnerabilities } = useData()
    const form = useForm()

    const [createOpen, setCreateOpen] = useState(false)
    const [importOpen, setImportOpen] = useState(false)

    async function onSubmit(values) {
        const session = await getSession()
        fetch(process.env.NEXT_PUBLIC_ANTIMATTER_API_URL + "/api/engagements", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => res.json())
            .then((data) => {
                form.reset()
                const client = clients.find((client) => client._id == values.client)
                data.clientLongName = client.longName
                data.clientShortName = client?.shortName
                setEngagements([...engagements, data])
                toast({ description: `Engagement "${data.engagementIdentifier}" has been created successfully.` })
            })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="ml-3">
                        Add Finding
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCreateOpen(true)}>
                        Create New Finding
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setImportOpen(true)}>
                        Import Vulnerability
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Create Finding</DialogTitle>
                                <DialogDescription>
                                    Complete the form below to create a new finding.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="findingIdentifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Finding Identifier</FormLabel>
                                            <FormControl>
                                                <Input placeholder="AM-001" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Remote Code Execution (RCE) Via SQL Injection" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog open={importOpen} onOpenChange={setImportOpen}>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Import Vulnerability</DialogTitle>
                                <DialogDescription>
                                    Complete the form below to import a vulnerability.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="findingIdentifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Finding Identifier</FormLabel>
                                            <FormControl>
                                                <Input placeholder="AM-001" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vulnerability"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Vulnerability</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "justify-between w-[462px]",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <p className="truncate">{field.value
                                                                ? (vulnerabilities.find(vulnerability => vulnerability._id === field.value)?.title)
                                                                : "Select client"}</p>
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 w-[462px]" align={"start"} >
                                                    <Command>
                                                        <CommandInput placeholder="Search vulnerabilities..." />
                                                        <CommandEmpty>No vulnerabilities found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {vulnerabilities.map((vulnerability) => (
                                                                <CommandItem
                                                                    value={vulnerability.title}
                                                                    key={vulnerability._id}
                                                                    onSelect={() => {
                                                                        form.setValue("vulnerability", vulnerability._id)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            vulnerability._id === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {vulnerability.title}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}