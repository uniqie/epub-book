import {
  ReactElement,
  StyleHTMLAttributes,
  TdHTMLAttributes,
  useEffect,
  useMemo,
} from "react"
import { Table, TableHead, TableHeader, TableRow } from "../ui/table"

type RenderType = () => ReactElement | HTMLElement

type ColumnType = {
  title?: string
  code: string
  headAttributes?: TdHTMLAttributes<HTMLTableCellElement>
  render?: RenderType
  children?: ColumnsType
}

type ColumnsType = Array<ColumnType>

type DataTableType = {
  columns: ColumnsType
  data?: Object[]
}

type HeadCellType = Exclude<ColumnType, "children">
type HeadRowType = Array<HeadCellType>

function deepSearchColumn(
  column: ColumnType,
  depth = 0,
  action: (depth: number, cur: HeadCellType) => void
) {
  const { children, headAttributes = {}, ...newColumn } = column
  headAttributes.colSpan = children?.length || 1
  action(depth, { ...newColumn, headAttributes })

  if (Array.isArray(children) && children.length > 0) {
    children.forEach((c, index) => {
      deepSearchColumn(c, depth + 1, action)
    })
  } else {
  }
}

function DataTable(props: React.PropsWithoutRef<DataTableType>) {
  const { columns } = props

  const headRows = useMemo(() => {
    const headRows = [] as Array<HeadRowType>

    columns.forEach((column, idx) => {
      deepSearchColumn(column, 0, (depth, cur) => {
        if (!headRows[depth]) {
          headRows[depth] = []
        }
        headRows[depth][idx] = cur
      })
    })
    return headRows
  }, [columns])

  console.log("headRows", headRows)

  return (
    <Table>
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
    </Table>
  )
}

export { ColumnsType }

export default DataTable
