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

export function handleMongooseError(error) {
  try {
    let errorMessage = ""
    Object.keys(error.errors).forEach((key) => {
      if (error?.errors[key]?.message) errorMessage = error.errors[key].message
    });

    return errorMessage

  } catch {
    return error
  }
}