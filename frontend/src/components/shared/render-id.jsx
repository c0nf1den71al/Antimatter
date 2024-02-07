"use client"

import { useData } from "@/providers/data-provider"
import { Skeleton } from "@/components/ui/skeleton"

export function RenderId({id, type}){
    const {engagements, loadingEngagements, findings, loadingFindings, vulnerabilities, loadingVulnerabilities, clients, loadingClients} = useData()

    
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
    } else if (type === "client") {
        if (loadingClients || !clients) {
            return <Skeleton className="h-4 w-[150px]" />;
        } else {
            const client = clients.find(client => client._id === id);
            if (client) {
                return client.clientIdentifier;
            } else {
                return <Skeleton className="h-4 w-[150px]" />;
            }
        }
    } else {
        // Handle other types if necessary
        return <Skeleton className="h-4 w-[150px]" />;
    }
}