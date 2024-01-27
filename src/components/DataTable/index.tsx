import {
  ReactElement,
  TdHTMLAttributes,
  useMemo,
} from "react"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableBody,
  TableCell,
} from "../ui/table"

type RenderType = () => ReactElement | HTMLElement
type headAttributes = TdHTMLAttributes<HTMLTableCellElement>

type ColumnType = {
  title?: string
  code: string
  headAttributes?: headAttributes
  render?: RenderType
  children?: ColumnsType
}

type ColumnsType = Array<ColumnType>

type DataTableType = {
  caption: string
  columns: ColumnsType
  defaultColumnAttributes?: headAttributes
  data?: Object[]
}

type HeadCellType = Exclude<ColumnType, "children"> & {
  _depth?: number
}

type HeadRowType = Array<HeadCellType>

function deepSearchColumn2(
  column: ColumnType,
  depth: number,
  list: Array<HeadCellType[]>,
  endColumns: Array<HeadCellType>
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
    const endColumn = newColumn as HeadCellType
    endColumn._depth = depth
    endColumns.push(endColumn)
  }
}

function DataTable(props: React.PropsWithoutRef<DataTableType>) {
  const {
    caption,
    columns,
    data,
    defaultColumnAttributes = {
      className: "text-center border-x border-solid border-slate-100",
    },
  } = props

  const [headRows, endColumns] = useMemo(() => {
    const arr = [] as Array<HeadRowType>

    let point = 0
    const temp = [] as Array<Array<HeadCellType[]>>

    // 尾节点
    const endColumns = [] as Array<HeadCellType>

    columns.forEach((column) => {
      const list = [] as Array<HeadCellType[]>
      deepSearchColumn2(column, 0, list, endColumns)
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
          data.map((d, idx) => {
            return (
              <TableRow key={idx}>
                {endColumns.map((column) => {
                  return <TableCell></TableCell>
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
