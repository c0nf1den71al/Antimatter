import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getValidChildren(children) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  )
}

export function stripTrailingSlash(str) {
  return str.endsWith('/') ?
      str.slice(0, -1) :
      str;
};