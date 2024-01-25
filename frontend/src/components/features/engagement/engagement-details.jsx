"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useData } from "@/providers/data-provider"
import { useState, useEffect } from "react"

export function EngagementDetails({ engagementId }) {
    const { engagements } = useData()
    const engagement = engagements.filter((engagement) => engagement._id == engagementId)[0]

    const [engagementIdentifier, setEngagementIdentifier] = useState("")

    useEffect(() => {
        setEngagementIdentifier(engagement?.engagementIdentifier)
    }, [engagement, setEngagementIdentifier])
    

    return (
        <>
            <Label>Engagement Identifier</Label>
            <Input placeholder="AM-ACME-WEB" value={engagementIdentifier} onChange={(e) => setEngagementIdentifier(e.target.value)} />
        </>
    )
}