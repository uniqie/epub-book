import { type ColumnType } from "@/components/DataTable"
import { BookBrief } from "./interface"
import { Entry } from "@zip.js/zip.js"

export const BookShelfColumns: ColumnType<BookBrief>[] = [
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

export const BookDataColumns: ColumnType<Entry>[] = [
  {
    code: "filename",
    title: "文件名",
    dataIndex: "filename",
  },
  {
    code: "compressedSize",
    title: "大小",
    dataIndex: "compressedSize",
    render: (row) => {
      return row.compressedSize + "字节"
    },
  },
]
