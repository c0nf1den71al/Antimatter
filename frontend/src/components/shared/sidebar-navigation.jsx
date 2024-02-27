"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function SidebarNavigation({ className, items, addButton, ...props }) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: item?.variant ? item.variant : "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
            item.className
          )}
        >
          {item.title}
        </Link>
      ))}
      {addButton && (
        <Button variant="outline" disabled className="cursor-not-allowed">
          <PlusCircle className="h-5 pr-2" /> New Section
        </Button>
      )}

    </nav>
  )
}