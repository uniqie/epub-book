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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>a</TableHead>
              <TableHead>b</TableHead>
              <TableHead>c</TableHead>
              <TableHead>d</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Page>
  )
}

export default Example
