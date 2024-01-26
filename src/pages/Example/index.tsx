import React from "react"
import { Page } from "@/components/ui/page"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import DataTable, { ColumnsType } from "@/components/DataTable"

const testColumns: ColumnsType = [
  {
    title: "name",
    code: "name",
    headAttributes: { className: "text-center", rowSpan: 2, colSpan: 2 },
  },
  {
    title: "location",
    code: "location",
    headAttributes: { className: "text-center", colSpan: 2 },
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
    headAttributes: { className: "text-center", rowSpan: 2 },
  },
]

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
        <DataTable columns={testColumns} />
      </Card>
    </Page>
  )
}

export default Example
