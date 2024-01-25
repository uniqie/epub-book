import { ReactElement, StyleHTMLAttributes, TdHTMLAttributes, useEffect, useMemo } from "react"
import { Table, TableHeader, TableRow } from "../ui/table"

type RenderType = () => ReactElement | HTMLElement

type HeadConfig = {
  class?: string
  colspan?: number
  style?: StyleHTMLAttributes<HTMLElement>
  subHead?: HeadConfig[]
}

type ColumnType = {
  title?: string
  hClass?: string
  render?: RenderType
  children: ColumnType[]
}

type DataTableType = {
  columns: ColumnType[]
}

type HeadRow = TdHTMLAttributes<HTMLBaseElement>

function DataTable(props: React.PropsWithoutRef<DataTableType>) {
  const { columns } = props

  const headRows: HeadRow[] = useMemo(() => {
    columns.forEach(() => {})
  }, [columns])

  useEffect(() => {}, [])

  return (
    <Table>
      <TableHeader>
        <TableRow></TableRow>
      </TableHeader>
    </Table>
  )
}
