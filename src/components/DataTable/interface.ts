import { ReactElement, TdHTMLAttributes } from "react"

type RenderType = (row: any) => ReactElement | HTMLElement
export type headAttributes = TdHTMLAttributes<HTMLTableCellElement>

/**
 * column
 */
export type ColumnType<RecordType> = {
  title?: string // 标题
  code: string // 唯一code
  headAttributes?: headAttributes // tableCell属性
  render?: RenderType // 渲染函数
  children?: ColumnsType<RecordType> // 子标题
}

export type ColumnsType<RecordType> = ColumnType<RecordType>[]

// export type HeadCellType = Exclude<ColumnType, "children"> & {
//   _depth?: number
// }

// export type HeadRowType = Array<HeadCellType>

export type DataTableType<RecordType extends Object> = {
  caption?: string
  columns: ColumnsType<RecordType>
  defaultColumnAttributes?: headAttributes
  data: any[]
}
