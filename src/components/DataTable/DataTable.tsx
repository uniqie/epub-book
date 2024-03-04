import useColumns from "./hooks/useColumns"

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableBody,
  TableCell,
} from "../ui/table"

import { DataTableType } from "./interface"

function DataTable<T extends Object>(
  props: React.PropsWithoutRef<DataTableType<T>>
) {
  const {
    caption,
    columns,
    data,
    defaultColumnAttributes = {
      className: "text-center border-x border-y border-solid border-slate-200",
    },
  } = props

  const [flatColumns, renderColumns] = useColumns<T>(
    columns,
    defaultColumnAttributes
  )

  console.log(flatColumns)

  return (
    <Table className="table-fixed border-collapse caption-top">
      {caption && (
        <TableCaption className="text-lg font-semibold my-6">
          {caption}
        </TableCaption>
      )}

      <TableHeader>
        {flatColumns.length > 0 &&
          flatColumns.map((row, depth) => {
            return (
              <TableRow key={depth}>
                {row.map((head, idx) => {
                  return (
                    <TableHead
                      key={head.code || idx}
                      headers={head.code}
                      {...head.headAttributes}
                    >
                      {head.title}
                    </TableHead>
                  )
                })}
              </TableRow>
            )
          })}
      </TableHeader>
      <TableBody>
        {Array.isArray(data) &&
          data.map((d: any, idx) => {
            return (
              <TableRow key={idx}>
                {renderColumns.map((column, code) => {
                  const { rowSpan, ...other } = column.headAttributes || {}
                  return (
                    <TableCell {...other} key={code}>
                      {column.render ? column.render(d) : d[column.code]}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}

export default DataTable
