"use client";

import { useData } from "@/providers/data-provider";
import { Skeleton } from "@/components/ui/skeleton";

export function RenderId({ id, type }) {
  const {
    engagements,
    loadingEngagements,
    vulnerabilities,
    loadingVulnerabilities,
    clients,
    loadingClients,
  } = useData();

  const findFindingById = (id) => {
    for (let engagement in engagements) {
      engagement = engagements[engagement];
      if (engagement?.findings && engagement.findings.length > 0) {
        for (let finding in engagement.findings) {
          finding = engagement.findings[finding];
          if (finding._id === id) {
            return finding;
          }
        }
      }
    }
    return null;
  };

  if (type === "engagement") {
    if (!engagements) {
      return <Skeleton className="h-4 w-[150px]" />;
    } else {
      const engagement = engagements.find(
        (engagement) => engagement._id === id,
      );
      if (engagement) {
        return engagement.engagementIdentifier;
      } else {
        return <Skeleton className="h-4 w-[150px]" />;
      }
    }
  } else if (type === "client") {
    if (!clients) {
      return <Skeleton className="h-4 w-[150px]" />;
    } else {
      const client = clients.find((client) => client._id === id);
      if (client) {
        return client.clientIdentifier;
      } else {
        return <Skeleton className="h-4 w-[150px]" />;
      }
    }
  } else if (type === "finding") {
    if (!engagements) {
      return <Skeleton className="h-4 w-[150px]" />;
    } else {
      const finding = findFindingById(id);

      if (finding) {
        return finding.findingIdentifier;
      } else {
        return <Skeleton className="h-4 w-[150px]" />;
      }
    }
  } else if (type === "vulnerability") {
    if (!vulnerabilities) {
      return <Skeleton className="h-4 w-[150px]" />;
    } else {
      const vulnerability = vulnerabilities.find(
        (vulnerability) => vulnerability._id === id,
      );
      if (vulnerability) {
        return vulnerability.vulnerabilityIdentifier;
      } else {
        return <Skeleton className="h-4 w-[150px]" />;
      }
    }
  } else {
    // Handle other types if necessary
    return <Skeleton className="h-4 w-[150px]" />;
  }
}
