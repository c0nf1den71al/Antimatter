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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"

import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { useData } from "@/providers/data-hook"

export function CreateDialog({ clients }) {
    const { toast } = useToast()
    const { engagements, setEngagements } = useData()
    const form = useForm()

    function onSubmit(values) {
        fetch(window.location.origin + "/api/engagements", { method: "PUT", credentials: "include", body: JSON.stringify(values) }).then((res) => res.json())
        .then((data) => {
            form.reset()
            const client = clients.find((client) => client._id == values.client)
            data.clientNameLong = client.longName
            data.clientNameShort = client?.shortName
            setEngagements([...engagements, data])
            toast({ description: `Engagement "${data.engagementCode}" has been created successfully.` })
        })
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
                                name="engagementCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Engagement Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="REPORTR-ACME-WEB" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a client..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {clients && clients.map((client) => {
                                                    return <SelectItem value={client._id} key={client._id}>{client.longName}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
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