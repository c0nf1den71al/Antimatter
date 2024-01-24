"use client"

import { Search, Route, Building2, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


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

    const [searchResults, setSearchResults] = useState([])

    const processSearch = (e) => {
        if (e.target.value == "") return setSearchResults([])
        const engagementResults = engagements.filter((engagement) => engagement.engagementCode.toUpperCase().includes(e.target.value.toUpperCase())).map((engagement) => ({ ...engagement, type: "engagement" }))
        const clientResults = clients.filter((client) => client.longName.toUpperCase().includes(e.target.value.toUpperCase()) || client.shortName.toUpperCase().includes(e.target.value.toUpperCase())).map((client) => ({ ...client, type: "client" }))
        const vulnerabilityResults = vulnerabilities.filter((vulnerability) => vulnerability.vulnerabilityCode.toUpperCase().includes(e.target.value.toUpperCase()) || vulnerability.title.toUpperCase().includes(e.target.value.toUpperCase())).map((vulnerability) => ({ ...vulnerability, type: "vulnerability" }))
        const allResults = [...engagementResults, ...clientResults, ...vulnerabilityResults]
        setSearchResults(allResults)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><Search className="h-5" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Global Search</DialogTitle>
                    <DialogDescription>
                        Search Antimatter for engagements, clients, and vulnerabilities.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input onChange={processSearch} placeholder="Search..." />
                    <Separator className="my-5" />
                    <div className="flex flex-col gap-3 max-h-72 overflow-y-scroll">
                        {searchResults.length > 0 ? searchResults.map((result) => {
                            return result.type === "engagement" ? (
                                <Card className="cursor-pointer hover:bg-muted">
                                    <CardContent className="p-3 flex flex-row items-center">
                                        <Route className="h-5" />
                                        <div className="pl-3">
                                            <p className="font-bold text-sm">Engagement</p>
                                            {result.engagementCode}
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : result.type === "client" ? (
                                <Card className="cursor-pointer hover:bg-muted">
                                    <CardContent className="p-3 flex flex-row items-center">
                                        <Building2 className="h-5" />
                                        <div className="pl-3">
                                            <p className="font-bold text-sm">Client</p>
                                            {result?.shortName || result?.longName}
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : result.type === "vulnerability" ? (
                                <Card className="cursor-pointer hover:bg-muted">
                                    <CardContent className="p-3 flex flex-row items-center">
                                        <Bug className="h-5" />
                                        <div className="pl-3">
                                            <p className="font-bold text-sm">Vulnerability</p>
                                            {result.title}
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : null
                        }) : <p className="text-center">No Results.</p>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}