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
import { useData } from "@/providers/data-provider"
import { getSession } from "next-auth/react"

import { stripTrailingSlash } from "@/lib/utils";

export function CreateDialog() {
    const { toast } = useToast()
    const { clients, setClients } = useData()
    const form = useForm()

    async function onSubmit(values) {
        const session = await getSession()
        values.contact = {}
        values.contact.fullName = values.contactFullName
        values.contact.email = values.contactEmail
        delete values.contactFullName
        delete values.contactEmail

        console.log(values)
        
        fetch(process.env.NEXT_PUBLIC_ANTIMATTER_API_URL + "/api/clients", { 
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => res.json())
        .then((data) => {
            form.reset()
            setClients([...clients, data])
            toast({ description: `Client "${data.clientIdendifier}" has been created successfully.` })
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-3">Create Client</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Create Client</DialogTitle>
                            <DialogDescription>
                                Complete the form below to create a new client.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="clientIdentifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client Identifier</FormLabel>
                                        <FormControl>
                                            <Input placeholder="AM-CLIENT-01" {...field} autoComplete="off" data-1p-ignore />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="longName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Long Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ACME Corporation" {...field} autoComplete="off" data-1p-ignore />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactFullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} autoComplete="off" data-1p-ignore />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="jdoe@example.com" {...field} autoComplete="off" data-1p-ignore />
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
    )
}