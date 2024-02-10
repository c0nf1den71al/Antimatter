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

export function CreateDialog() {
    const { toast } = useToast()
    const { clients, setClients } = useData()
    const form = useForm()

    async function onSubmit(values) {
        values.contact = {}
        values.contact.fullName = values.contactFullName
        values.contact.email = values.contactEmail
        delete values.contactFullName
        delete values.contactEmail

        const res = await fetch("/api/clients", { 
            method: "PUT",
            body: JSON.stringify(values)
        })
        
        const data = await res.json()

        setClients([...clients, data])
        toast({ description: `Client "${data.clientIdendifier}" has been created successfully.` })
        form.reset()
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