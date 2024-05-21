import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { RenderId } from "./render-id";

export function Breadcrumbs({ items, ...props }) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem
              key={item.title.split(" ").join("-").toLowerCase()}
              isCurrentPage={item?.isCurrentPage}
            >
              <BreadcrumbLink key={item.href} href={item.href}>
                {item?.type ? (
                  <RenderId id={item.title} type={item.type} />
                ) : (
                  item.title
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 != items.length && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
