"use client"

import { Search, Route, Building2, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { useData } from "@/providers/data-provider"
import { useState } from "react"

export function GlobalSearch() {
    const { engagements, clients, vulnerabilities } = useData()

    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [open, setOpen] = useState(false)

    const processSearch = (e) => {
        setSearchText(e.target.value)
        if (e.target.value == "") return setSearchResults([])
        console.log(engagements)
        const engagementResults = engagements.filter((engagement) => engagement.engagementIdentifier.toUpperCase().includes(e.target.value.toUpperCase())).map((engagement) => ({ ...engagement, type: "engagement" }))
        const clientResults = clients.filter((client) => client.longName.toUpperCase().includes(e.target.value.toUpperCase()) || client.shortName.toUpperCase().includes(e.target.value.toUpperCase())).map((client) => ({ ...client, type: "client" }))
        const vulnerabilityResults = vulnerabilities.filter((vulnerability) => vulnerability.vulnerabilityIdentifier.toUpperCase().includes(e.target.value.toUpperCase()) || vulnerability.title.toUpperCase().includes(e.target.value.toUpperCase())).map((vulnerability) => ({ ...vulnerability, type: "vulnerability" }))
        const allResults = [...engagementResults, ...clientResults, ...vulnerabilityResults]
        setSearchResults(allResults)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer"><Search className="h-5" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Global Search</DialogTitle>
                    <DialogDescription>
                        Search Antimatter for engagements, clients, and vulnerabilities.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input value={searchText} onChange={processSearch} placeholder="Search..." />
                    <Separator className="my-5" />
                    <div className="flex flex-col gap-3 max-h-72 overflow-y-scroll">
                        {searchResults.length > 0 ? searchResults.map((result) => {
                            return result.type === "engagement" ? (
                                <Link href={`/dashboard/engagements/${result._id}`} onClick={() => setOpen(false)}>
                                    <Card className="cursor-pointer hover:bg-muted">
                                        <CardContent className="p-3 flex flex-row items-center">
                                            <Route className="h-5" />
                                            <div className="pl-3">
                                                <p className="font-bold text-sm">Engagement</p>
                                                {result.engagementIdentifier}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ) : result.type === "client" ? (
                                <Link href={`/dashboard/clients/${result._id}`} onClick={() => setOpen(false)}>
                                    <Card className="cursor-pointer hover:bg-muted">
                                        <CardContent className="p-3 flex flex-row items-center">
                                            <Building2 className="h-5" />
                                            <div className="pl-3">
                                                <p className="font-bold text-sm">Client</p>
                                                {result?.shortName || result?.longName}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ) : result.type === "vulnerability" ? (
                                <Link href={`/dashboard/vulnerabilities/${result._id}`} onClick={() => setOpen(false)}>
                                    <Card className="cursor-pointer hover:bg-muted">
                                        <CardContent className="p-3 flex flex-row items-center">
                                            <Bug className="h-5" />
                                            <div className="pl-3">
                                                <p className="font-bold text-sm">Vulnerability</p>
                                                {result.title}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ) : null
                        }) : <p className="text-center">No Results.</p>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}