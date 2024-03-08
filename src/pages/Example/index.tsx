import React from "react"
import { Outlet } from "react-router-dom"

import { Page } from "@/components/ui/page"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import DataTable from "@/components/DataTable"

const testColumns = [
  {
    title: "name",
    code: "name",
    children: [
      {
        title: "A",
        code: "A",
        children: [
          {
            title: "demo1",
            code: "demo1",
            render: () => <div>***</div>,
          },
          {
            title: "demo2",
            code: "demo2",
          },
        ],
      },
      {
        title: "B",
        code: "B",
      },
    ],
  },
  {
    title: "location",
    code: "location",
    children: [
      {
        title: "demo1",
        code: "demo1",
      },
      {
        title: "demo2",
        code: "demo2",
      },
    ],
  },
  {
    title: "pag",
    code: "pag",
  },
]

const demoData = [
  { demo1: 13, demo2: 14, B: 123, pag: "123" },
  { demo1: 13, demo2: 14, B: 123, pag: "456" },
  { demo1: 13, demo2: 14, B: 123, pag: "123" },
] as any[]

function Example(): React.ReactElement {
  return (
    <Page>
      <Card className="mt-12 mx-10">
        <CardHeader>
          <CardTitle>Epub book</CardTitle>
        </CardHeader>
        <CardContent>
          <Input accept=".epub" className="w-60" type="file" />
        </CardContent>
      </Card>
      <Card className="mt-12 mx-10">
        <DataTable caption="Table" columns={testColumns} data={demoData} />
      </Card>
      <Outlet></Outlet>
    </Page>
  )
}

export default Example
