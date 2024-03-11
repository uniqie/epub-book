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
    striped,
    defaultColumnAttributes = {
      className: "text-center border-x border-y border-solid border-slate-200",
    },
  } = props

  const [flatColumns, renderColumns] = useColumns<T>(
    columns,
    defaultColumnAttributes
  )

  return (
    <Table className="table-fixed border-collapse caption-top">
      {caption && (
        <TableCaption className="text-lg font-semibold my-6">
          {caption}
        </TableCaption>
      )}

      <TableHeader className="bg-slate-100">
        {flatColumns.length > 0 &&
          flatColumns.map((row, depth) => {
            return (
              <TableRow key={depth}>
                {row.map((head) => {
                  return (
                    <TableHead
                      key={head.dataIndex}
                      headers={head.dataIndex}
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
              <TableRow key={idx} className={striped ? "even:bg-gray-50" : ""}>
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
