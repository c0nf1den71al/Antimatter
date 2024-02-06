"use client"

import { useData } from "@/providers/data-provider"
import { Skeleton } from "@/components/ui/skeleton"

export function RenderId({id, type}){
    const {engagements, loadingEngagements, findings, loadingFindings, vulnerabilities, loadingVulnerabilities} = useData()

    
    if (type === "engagement") {
        if (loadingEngagements || !engagements) {
            return <Skeleton className="h-4 w-[150px]" />;
        } else {
            const engagement = engagements.find(engagement => engagement._id === id);
            if (engagement) {
                return engagement.engagementIdentifier;
            } else {
                return <Skeleton className="h-4 w-[150px]" />;
            }
        }
    } else {
        // Handle other types if necessary
        return <Skeleton className="h-4 w-[150px]" />;
    }
}