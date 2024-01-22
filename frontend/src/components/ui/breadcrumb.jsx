import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn, getValidChildren } from "@/lib/utils"

export const Breadcrumb = (
  (
    {
      children,
      className,
      separator = <ChevronRight className="h-4 w-4" />,
      addSeparator = true,
      ...props
    },
    forwardedRef
  ) => {
    const validChildren = getValidChildren(children)
    const clones = validChildren.map((child, index) => {
      return React.cloneElement(child, {
        addSeparator,
        separator,
        isLastChild: validChildren.length === index + 1,
      })
    })

    return (
      <nav
        className={cn("relative break-words", className)}
        aria-label="breadcrumb"
        {...props}
        ref={forwardedRef}
      >
        <ol className="flex items-center">{clones}</ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"


export const BreadcrumbItem = (
  (
    {
      children,
      className,
      isCurrentPage,
      isLastChild,
      separator,
      addSeparator,
      ...props
    },
    forwardedRef
  ) => {
    const validChildren = getValidChildren(children)
    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return React.cloneElement(child, { isCurrentPage })
      }

      if (child.type === BreadcrumbSeparator) {
        return React.cloneElement(child, {
          children: separator || child.props.children,
        })
      }

      return child
    })

    return (
      <li
        className={cn("inline-flex items-center", className)}
        {...props}
        ref={forwardedRef}
      >
        {clones}
        {!isLastChild && addSeparator && (
          <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        )}
      </li>
    )
  }
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export const BreadcrumbLink = (({ className, as: asComp, isCurrentPage, ...props }, forwardedRef) => {
  const Comp = (isCurrentPage ? "span" : asComp || "a")

  return (
    <Comp
      className={cn(
        "text-sm font-medium underline-offset-4 aria-[current]:opacity-60 [&:not([aria-current])]:hover:underline",
        className
      )}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
      ref={forwardedRef}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"


export const BreadcrumbSeparator = (({ className, ...props }, forwardedRef) => {
  return (
    <span
      className={cn("mx-2 opacity-50", className)}
      role="presentation"
      {...props}
      ref={forwardedRef}
    />
  )
})
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"