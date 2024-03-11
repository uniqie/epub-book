import { ReactNode, TdHTMLAttributes } from "react"

type RenderType<RecordType> = (row: RecordType) => ReactNode
export type headAttributes = TdHTMLAttributes<HTMLTableCellElement>

/**
 * column
 */
export type ColumnType<RecordType> = {
  title?: string // 标题
  code: keyof RecordType // 唯一code
  dataIndex?: string // 唯一索引
  headAttributes?: headAttributes // tableCell属性
  render?: RenderType<RecordType> // 渲染函数
  children?: ColumnsType<RecordType> // 子列
}

export type ColumnsType<RecordType> = ColumnType<RecordType>[]

export type DataTableType<RecordType extends Object> = {
  caption?: string
  columns: ColumnsType<RecordType>
  defaultColumnAttributes?: headAttributes
  data: any[]
  striped?: boolean
}
