"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"

import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useData } from "@/providers/data-provider"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

import { cn, stripTrailingSlash } from "@/lib/utils"

export function GeneralSettings({ vulnerabilityId }) {
    const { settings, setSettings, loadingSettings } = useData()
    const form = useForm()
    const { toast } = useToast()

    async function onSubmit(values) {
        // let postBody = values
        // postBody.startDate = values?.dateRange?.from
        // postBody.endDate = values?.dateRange?.to
        // delete postBody?.dateRange

        // const res = await fetch(`/api/engagements/${engagementId}`, { 
        //     method: "POST",
        //     body: JSON.stringify(postBody)
        // })

        // const data = await res.json()
        // const oldEngagement = engagements.find((engagement) => engagement._id === engagementId)
        // data.clientShortName = oldEngagement.clientShortName
        // data.clientLongName = oldEngagement.clientLongName

        // setEngagements([...engagements.filter((engagement => engagement._id !== engagementId)), data])
        // toast({ description: `Engagement "${data.engagementIdentifier}" has been updated successfully.` })
        return null
    }


    useEffect(() => {
        form.setValue("webPort", settings.find(setting => setting.name === "ports")?.value.web)
        form.setValue("apiPort", settings.find(setting => setting.name === "ports")?.value.api)

        const down = (e) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                form.handleSubmit(onSubmit)()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [settings])

    return (
        <div className="space-y-6 h-full">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Change the general settings of your Antimatter instance.
                    </p>
                </div>
                <div>
                    <Button onClick={() => { form.handleSubmit(onSubmit)() }}>Save (ctrl+s)</Button>
                </div>
            </div>
            <Separator />
            <ScrollArea className="h-full">
                <Form {...form}>
                    <form onSubmit={() => form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="webPort"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Antimatter Web Port</FormLabel>
                                        <FormDescription>The port which the web application is listening on. This must be changed via the ANTIMATTER_WEB_PORT environment variable.</FormDescription>
                                        <FormControl>
                                            <Input placeholder="4200" value={field.value} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="apiPort"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Antimatter API Port</FormLabel>
                                        <FormDescription>The port which the API is listening on. This must be changed via the ANTIMATTER_API_PORT environment variable.</FormDescription>
                                        <FormControl>
                                            <Input placeholder="4201" value={field.value} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Theme</FormLabel>
                                        <FormDescription>
                                            Select the theme for the dashboard.
                                        </FormDescription>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid max-w-md grid-cols-2 gap-8 pt-2"
                                        >
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="light" className="sr-only" />
                                                    </FormControl>
                                                    <div className="items-center rounded-md border-2 hover:border-primary border-primary border-muted p-1 hover:border-accent">
                                                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="block w-full p-2 text-center font-normal">
                                                        Light
                                                    </span>
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="dark" className="sr-only" disabled />
                                                    </FormControl>
                                                    <div className="items-center rounded-md border-2 border-muted cursor-not-allowed bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                                        <div className="space-y-2 rounded-sm bg-stone-950 p-2">
                                                            <div className="space-y-2 rounded-md bg-stone-800 p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-stone-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-stone-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-stone-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-stone-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-stone-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-stone-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-stone-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-stone-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="block w-full p-2 text-center font-normal">
                                                        Dark (Coming Soon)
                                                    </span>
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
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