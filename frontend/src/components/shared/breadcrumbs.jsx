"use client"

import { usePathname } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@/components/ui/breadcrumb"

export function Breadcrumbs({ className, items, ...props }) {
    const pathname = usePathname()

    return (
        <Breadcrumb {...props}>
            {items.map((item) => (
                <BreadcrumbItem key={item.title.split(" ").join("-").toLowerCase()} isCurrentPage={pathname === item.href}>
                    <BreadcrumbLink key={item.href} href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}