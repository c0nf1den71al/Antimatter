"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Check, ChevronsUpDown, PlusCircleIcon, Calendar as CalendarIcon, Badge } from "lucide-react"
import { useData } from "@/providers/data-provider"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { getSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"


import { cn, stripTrailingSlash } from "@/lib/utils"
import { format } from "date-fns"


export function EngagementDetails({ engagementId }) {
    const { engagements, clients } = useData()
    const form = useForm()
    const {toast} = useToast()

    const engagement = engagements.filter((engagement) => engagement._id == engagementId)[0]

    async function onSubmit(values) {
        const session = await getSession()
        let postBody = values
        postBody.startDate = values?.dateRange?.from
        postBody.endDate = values?.dateRange?.to
        delete postBody?.dateRange

        console.log(postBody)
        fetch(`${stripTrailingSlash(process.env.NEXT_PUBLIC_ANTIMATTER_API_URL)}/api/engagements/${engagementId}`, { 
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        }).then((res) => res.json())
        .then((data) => {
            // const engagement = engagements.find((engagement) => engagement._id === engagementId)
            
            // setEngagements([...engagements, data])
            toast({ description: `Engagement "${data.engagementIdentifier}" has been updated successfully.` })
        })
    }


    useEffect(() => {
        form.setValue("client", engagement?.client)
        form.setValue("status", engagement?.status)
        form.setValue("engagementIdentifier", engagement?.engagementIdentifier)
        form.setValue("scope", engagement?.scope)
        form.setValue("dateRange", {"from": engagement?.startDate, "to": engagement?.endDate})


        const down = (e) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                form.handleSubmit(onSubmit)()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [engagements])

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">Overview</h3>
                    <p className="text-sm text-muted-foreground">
                        Change details relating to an engagement using the form below.
                    </p>
                </div>
                <div>
                    <Button onClick={() => {form.handleSubmit(onSubmit)()}}>Save (ctrl+s)</Button>
                </div>
            </div>
            <Separator />
            <ScrollArea className="h-full">
                <Form {...form}>
                    <form onSubmit={() => form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid-cols-4 grid gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="engagementIdentifier"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Engagement Identifier</FormLabel>
                                            <FormControl>
                                                <Input placeholder="AM-ACME-WEB" value={field.value} onChange={field.onChange} autoComplete="off" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                                    <SelectItem value="complete">Complete</SelectItem>
                                                    <SelectItem value="delayed">Delayed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                                            "justify-between font-normal",
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

                            <FormField
                                control={form.control}
                                name="dateRange"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Engagement Dates</FormLabel>
                                        <FormControl>
                                            <div className={cn("grid gap-2")}>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            id="date"
                                                            variant={"outline"}
                                                            className={cn(
                                                                "justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value?.from ? (
                                                                field.value?.to ? (
                                                                    <>
                                                                        {format(field.value.from, "LLL dd, y")} -{" "}
                                                                        {format(field.value.to, "LLL dd, y")}
                                                                    </>
                                                                ) : (
                                                                    format(field.value.from, "LLL dd, y")
                                                                )
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            initialFocus
                                                            mode="range"
                                                            defaultMonth={field.value?.from}
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            numberOfMonths={2}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                control={form.control}
                                name="consultants"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Consultants</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start">
                                                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                                                        Consultants
                                                        {consultants?.length > 0 && (
                                                            <>
                                                                <Separator orientation="vertical" className="mx-2 h-4" />
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="rounded-sm px-1 font-normal lg:hidden"
                                                                >
                                                                    {consultants?.length}
                                                                </Badge>
                                                                <div className="hidden space-x-1 lg:flex">
                                                                    {consultants?.length > 2 ? (
                                                                        <Badge
                                                                            variant="secondary"
                                                                            className="rounded-sm px-1 font-normal"
                                                                        >
                                                                            {consultants?.length} selected
                                                                        </Badge>
                                                                    ) : (
                                                                        <Tag
                                                                            variant="secondary"
                                                                            key="a"
                                                                            className="rounded-sm px-1 font-normal"
                                                                        >
                                                                            Test
                                                                        </Tag>
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0" align="start">
                                                    TODO: https://raw.githubusercontent.com/shadcn-ui/ui/0fae3fd93ae749aca708bdfbbbeddc5d576bfb2e/apps/www/app/examples/tasks/components/data-table-faceted-filter.tsx 
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> */}

                            <FormField
                                control={form.control}
                                name="scope"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Scope</FormLabel>
                                        <FormControl>
                                            <Textarea rows={10} placeholder={"shop.antimatter.local\napi.antimatter.local\n..."} value={field.value} onChange={field.onChange} autoComplete="off" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </ScrollArea>
        </div>
    )
}