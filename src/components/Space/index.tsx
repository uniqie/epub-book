import React, { PropsWithoutRef, forwardRef, PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type SpaceProps = {
  gap?: number
}

const Space = forwardRef(
  (
    props: PropsWithoutRef<PropsWithChildren<SpaceProps>>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { children, gap } = props

    const className = cn(["flex", `gap-${gap || 2}`])

    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }
)

export { Space }
