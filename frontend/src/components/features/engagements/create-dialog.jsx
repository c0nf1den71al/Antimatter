"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { useData } from "@/providers/data-provider"

import { stripTrailingSlash, cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react"

export function CreateDialog({ clients }) {
    const { toast } = useToast()
    const { engagements, setEngagements } = useData()
    const form = useForm()

    async function onSubmit(values) {
        const res = await fetch("/api/engagements", { 
            method: "PUT",
            body: JSON.stringify(values)
        })

        const data = await res.json()
        const client = clients.find((client) => client._id == values.client)
        data.clientLongName = client.longName
        data.clientShortName = client?.shortName
        setEngagements([...engagements, data])
        toast({ description: `Engagement "${data.engagementIdentifier}" has been created successfully.` })
        form.reset()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-3">Create Engagement</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Create Engagement</DialogTitle>
                            <DialogDescription>
                                Complete the form below to create a new engagement.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="engagementIdentifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Engagement Identifier</FormLabel>
                                        <FormControl>
                                            <Input placeholder="AM-ACME-01" {...field} autoComplete="off" data-1p-ignore />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Client</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? (clients.find(client => client._id === field.value)?.shortName || clients.find(client => client._id === field.value)?.longName || "Select client")
                                                        : "Select client"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0" align={"start"} >
                                            <Command>
                                                <CommandInput placeholder="Search clients..." />
                                                <CommandEmpty>No clients found.</CommandEmpty>
                                                <CommandGroup>
                                                    {clients.map((client) => (
                                                        <CommandItem
                                                            value={client?.shortName ? client.shortName : client.longName}
                                                            key={client._id}
                                                            onSelect={() => {
                                                                form.setValue("client", client._id)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    client._id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {client?.shortName ? client.shortName : client.longName}
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
    )
}