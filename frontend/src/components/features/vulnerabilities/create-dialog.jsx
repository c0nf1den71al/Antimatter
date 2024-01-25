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
    const { vulnerabilities, setVulnerabilities } = useData()
    const form = useForm()

    async function onSubmit(values) {
        const session = await getSession()
        fetch(stripTrailingSlash(process.env.NEXT_PUBLIC_ANTIMATTER_API_URL) + "/api/vulnerabilities", { 
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => res.json())
        .then((data) => {
            form.reset()
            setVulnerabilities([...vulnerabilities, data])
            toast({ description: `Engagement "${data.vulnerabilityIdentifier}" has been created successfully.` })
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-3">Create Vulnerability</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Create Vulnerability</DialogTitle>
                            <DialogDescription>
                                Complete the form below to create a new vulnerability.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="vulnerabilityIdentifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vulnerability Identifier</FormLabel>
                                        <FormControl>
                                            <Input placeholder="VULN-WEB-01" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vulnerability Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Remote Code Execution via SQL Injection" {...field} />
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