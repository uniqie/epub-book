import { Input } from "@/components/Epub"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import DataTable, { type ColumnType } from "@/components/DataTable"
import { useState } from "react"

type BookData = {
  name: string
  size: number
  lastModifiedDate?: Date
}

const columns: ColumnType<BookData>[] = [
  {
    code: "name",
    title: "name",
    dataIndex: "name",
  },
  {
    code: "size",
    title: "size",
    dataIndex: "size",
    render: (row) => {
      return `${(row.size / 1000 ** 2).toFixed(2)}MB`
    },
  },
  {
    code: "lastModifiedDate",
    title: "modifyTime",
    dataIndex: "lastModifiedDate",
    // headAttributes: {
    // },
    render: (row) => {
      return row.lastModifiedDate instanceof Date
        ? row.lastModifiedDate.toLocaleString()
        : ""
    },
  },
]

function EpubInput() {
  const [data, setData] = useState<BookData[]>([])

  const handleBooksChange = (files: FileList | null) => {
    console.log(files)
    setData(files ? Array.from(files) : [])
  }

  return (
    <>
      <Card className="m-4 mt-10 p-2">
        <CardTitle className="m-4">epub-button</CardTitle>
        <CardContent>
          {data.length > 0 ? (
            <DataTable columns={columns} data={data} striped />
          ) : (
            <Input onChange={handleBooksChange} />
          )}
        </CardContent>
      </Card>
      <Card className="m-4"></Card>
    </>
  )
}

export default EpubInput
