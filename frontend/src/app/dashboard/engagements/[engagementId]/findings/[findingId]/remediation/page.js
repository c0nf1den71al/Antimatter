import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SidebarNavigation } from "@/components/shared/sidebar-navigation";
import { FindingRemediation } from "@/components/features/finding/finding-remediation";
import { ArrowLeft } from "lucide-react";

export default async function Remediation({ params }) {
  const breadcrumbItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Engagements",
      href: "/dashboard/engagements",
    },
    {
      title: params.engagementId,
      type: "engagement",
      href: `/dashboard/engagements/${params.engagementId}`,
    },
    {
      title: "Findings",
      href: `/dashboard/engagements/${params.engagementId}/findings`,
    },
    {
      title: params.findingId,
      type: "finding",
      href: `/dashboard/engagements/${params.engagementId}/findings/${params.findingId}`,
    },
    {
      title: "Remediation",
      isCurrentPage: true,
    },
  ];

  const sidebarNavItems = [
    {
      title: (
        <>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </>
      ),
      href: `/dashboard/engagements/${params.engagementId}/findings`,
      variant: "outline",
      className: "mb-4",
    },
    {
      title: "Overview",
      href: `/dashboard/engagements/${params.engagementId}/findings/${params.findingId}`,
    },
    {
      title: "Summary",
      href: `/dashboard/engagements/${params.engagementId}/findings/${params.findingId}/summary`,
    },
    {
      title: "Evidence",
      href: `/dashboard/engagements/${params.engagementId}/findings/${params.findingId}/evidence`,
    },
    {
      title: "Impact",
      href: `/dashboard/engagements/${params.engagementId}/findings/${params.findingId}/impact`,
    },
    {
      title: "Remediation",
      href: `/dashboard/engagements/${params.engagementId}/findings/${params.findingId}/remediation`,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex pb-5 pt-10 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 grow">
        <aside className="-mx-4 lg:w-1/6">
          <SidebarNavigation items={sidebarNavItems} />
        </aside>
        <div className="flex-1 h-full relative">
          <FindingRemediation
            engagementId={params.engagementId}
            findingId={params.findingId}
          />
        </div>
      </div>
    </div>
  );
}
