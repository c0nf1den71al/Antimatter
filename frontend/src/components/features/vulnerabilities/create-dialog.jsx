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

export function CreateDialog() {
    const { toast } = useToast()
    const { vulnerabilities, setVulnerabilities } = useData()
    const form = useForm()

    async function onSubmit(values) {
        const res = await fetch("/api/vulnerabilities", { 
            method: "PUT",
            body: JSON.stringify(values)
        })

        const data = await res.json()

        setVulnerabilities([...vulnerabilities, data])
        toast({ description: `Vulnerability "${data.vulnerabilityIdentifier}" has been created successfully.` })
        form.reset()
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
                                            <Input placeholder="VULN-WEB-01" {...field} autoComplete="off" data-1p-ignore />
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