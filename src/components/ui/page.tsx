import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type InternalPageType = typeof InternalPage
type ContentType = typeof Content

type PageType = InternalPageType & {
  Content: ContentType
}

const InternalPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...otherProps } = props

  return (
    <div
      ref={ref}
      className={cn("flex flex-col h-full", className)}
      {...otherProps}
    ></div>
  )
})

const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...otherProps } = props

  return <div ref={ref} className={cn("grow	", className)} {...otherProps}></div>
})

const Page = InternalPage as PageType
Page.Content = Content

export { Page }
