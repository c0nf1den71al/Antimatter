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

import { Calendar as CalendarIcon } from "lucide-react"

import { useData } from "@/providers/data-provider"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"

import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



export function EngagementDetails({ engagementId }) {
    const { engagements } = useData()
    const form = useForm()

    const engagement = engagements.filter((engagement) => engagement._id == engagementId)[0]

    const [engagementIdentifier, setEngagementIdentifier] = useState("")
    const [date, setDate] = useState({
        from: undefined,
        to: undefined,
    })

    async function onSubmit(values) {
        console.log(values)
        // const session = await getSession()
        // fetch(process.env.NEXT_PUBLIC_ANTIMATTER_API_URL + "/api/engagements", { 
        //     method: "PUT",
        //     headers: {
        //         "Authorization": `Bearer ${session.accessToken}`,
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(values)
        // }).then((res) => res.json())
        // .then((data) => {
        //     form.reset()
        //     const client = clients.find((client) => client._id == values.client)
        //     data.clientLongName = client.longName
        //     data.clientShortName = client?.shortName
        //     setEngagements([...engagements, data])
        //     toast({ description: `Engagement "${data.engagementIdentifier}" has been created successfully.` })
        // })
    }


    useEffect(() => {
        setEngagementIdentifier(engagement?.engagementIdentifier)
        setDate({
            from: engagement?.startDate,
            to: engagement?.endDate
        })
    }, [engagement])

    console.log(date)

    return (
        <>
            <Form {...form}>
                <form onSubmit={() => form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="enagementIdentifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Engagement Identifier</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="AM-ACME-WEB" value={engagementIdentifier} onChange={(e) => setEngagementIdentifier(e.target.value)} autoComplete="off" />
                                    </FormControl>
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
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date?.from ? (
                                                            date.to ? (
                                                                <>
                                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                                    {format(date.to, "LLL dd, y")}
                                                                </>
                                                            ) : (
                                                                format(date.from, "LLL dd, y")
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
                                                        defaultMonth={date?.from}
                                                        selected={date}
                                                        onSelect={setDate}
                                                        numberOfMonths={2}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="enagementIdentifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Engagement Identifier</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="AM-ACME-WEB" value={engagementIdentifier} onChange={(e) => setEngagementIdentifier(e.target.value)} autoComplete="off" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </>
    )
}