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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
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
    const { engagements, setEngagements } = useData()
    const form = useForm()

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
<DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="ml-3">
                            Add Finding
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Create New Finding
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Import Vulnerability
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

        // <Dialog>
        //     <DialogTrigger asChild>
        //         <Button className="ml-3">Create Finding</Button>
        //     </DialogTrigger>
        //     <DialogContent>
        //         <Form {...form}>
        //             <form onSubmit={form.handleSubmit(onSubmit)}>
        //                 <DialogHeader>
        //                     <DialogTitle>Create Engagement</DialogTitle>
        //                     <DialogDescription>
        //                         Complete the form below to create a new engagement.
        //                     </DialogDescription>
        //                 </DialogHeader>
        //                 <div className="grid gap-4 py-4">
        //                     <FormField
        //                         control={form.control}
        //                         name="engagementIdentifier"
        //                         render={({ field }) => (
        //                             <FormItem>
        //                                 <FormLabel>Engagement Identifier</FormLabel>
        //                                 <FormControl>
        //                                     <Input placeholder="AM-ACME-01" {...field} />
        //                                 </FormControl>
        //                             </FormItem>
        //                         )}
        //                     />
        //                     <FormField
        //                         control={form.control}
        //                         name="client"
        //                         render={({ field }) => (
        //                             <FormItem>
        //                                 <FormLabel>Client</FormLabel>
        //                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
        //                                     <FormControl>
        //                                         <SelectTrigger>
        //                                             <SelectValue placeholder="Select a client..." />
        //                                         </SelectTrigger>
        //                                     </FormControl>
        //                                     <SelectContent>
        //                                         {clients && clients.map((client) => {
        //                                             return <SelectItem value={client._id} key={client._id}>{client.longName}</SelectItem>
        //                                         })}
        //                                     </SelectContent>
        //                                 </Select>
        //                             </FormItem>
        //                         )}
        //                     />
        //                 </div>
        //                 <DialogFooter>
        //                     <DialogClose asChild>
        //                         <Button type="submit">Save changes</Button>
        //                     </DialogClose>
        //                 </DialogFooter>
        //             </form>
        //         </Form>
        //     </DialogContent>
        // </Dialog>
    )
}