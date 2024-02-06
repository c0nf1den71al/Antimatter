import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@/components/ui/breadcrumb"

import { RenderId } from "./render-id"

export function Breadcrumbs({ items, ...props }) {
    return (
        <Breadcrumb {...props}>
            {items.map((item) => (
                <BreadcrumbItem key={item.title.split(" ").join("-").toLowerCase()} isCurrentPage={item?.isCurrentPage}>
                    <BreadcrumbLink key={item.href} href={item.href}>
                        {item?.type ? <RenderId id={item.title} type={item.type} /> : item.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}