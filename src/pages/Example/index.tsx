import React from "react"
import { Outlet } from "react-router-dom"

import { Page } from "@/components/ui/page"

function Example(): React.ReactElement {
  return (
    <Page className="px-2">
      <Outlet></Outlet>
    </Page>
  )
}

export default Example
