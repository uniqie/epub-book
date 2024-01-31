import { ReactElement, TdHTMLAttributes, useMemo } from "react"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableBody,
  TableCell,
} from "../ui/table"

type RenderType<T> = (row: T) => ReactElement | HTMLElement
type headAttributes = TdHTMLAttributes<HTMLTableCellElement>

type ColumnType<T> = {
  title?: string
  code: string
  headAttributes?: headAttributes
  render?: RenderType<T>
  children?: ColumnsType<T>
}

type ColumnsType<T> = Array<ColumnType<T>>

type DataTableType<T extends Object> = {
  caption?: string
  columns: ColumnsType<T>
  defaultColumnAttributes?: headAttributes
  data: T[]
}

type HeadCellType<T> = Exclude<ColumnType<T>, "children"> & {
  _depth?: number
}

type HeadRowType<T> = Array<HeadCellType<T>>

function deepSearchColumn2<T>(
  column: ColumnType<T>,
  depth: number,
  list: Array<HeadCellType<T>[]>,
  endColumns: Array<HeadCellType<T>>
) {
  const { children, ...newColumn } = column
  if (list[depth]) {
    list[depth].push(newColumn)
  } else {
    list[depth] = [newColumn]
  }

  if (Array.isArray(children) && children?.length > 0) {
    children.forEach((subColumn) =>
      deepSearchColumn2(subColumn, depth + 1, list, endColumns)
    )
  } else {
    const endColumn = newColumn as HeadCellType<T>
    endColumn._depth = depth
    endColumns.push(endColumn)
  }
}

function DataTable<T extends Object>(
  props: React.PropsWithoutRef<DataTableType<T>>
) {
  const {
    caption,
    columns,
    data,
    defaultColumnAttributes = {
      className: "text-center border-x border-solid border-slate-100",
    },
  } = props

  const [headRows, endColumns] = useMemo(() => {
    const arr = [] as Array<HeadRowType<T>>

    let point = 0
    const temp = [] as Array<Array<HeadCellType<T>[]>>

    // 尾节点
    const endColumns = [] as Array<HeadCellType<T>>

    columns.forEach((column) => {
      const list = [] as Array<HeadCellType<T>[]>
      deepSearchColumn2<T>(column, 0, list, endColumns)
      const maxColspan = list[list.length - 1].length * list.length
      temp.push(list)
      list.forEach((item, depth) => {
        const colSpan = depth === list.length - 1 ? 1 : maxColspan / item.length
        item.forEach((cell, idx) => {
          const { headAttributes = { ...defaultColumnAttributes } } = cell
          headAttributes.colSpan = colSpan
          if (depth !== list.length - 1) {
            headAttributes.rowSpan = 1
          }
          cell.headAttributes = headAttributes
          if (!arr[depth]) {
            arr[depth] = []
          }
          arr[depth][point + idx] = cell
        })
      })
      point = point + maxColspan
    })
    const maxDepth = temp.reduce((max, cur) => Math.max(max, cur.length), 0)

    endColumns.forEach((endColumn) => {
      if (endColumn.headAttributes && typeof endColumn?._depth === "number") {
        endColumn.headAttributes.rowSpan = maxDepth - endColumn._depth + 1
      }
    })
    return [arr, endColumns]
  }, [columns]) // eslint-disable-line

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        {headRows.length > 0 &&
          headRows.map((row, depth) => {
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
                {endColumns.map((column, code) => {
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

export { ColumnsType }

export default DataTable
