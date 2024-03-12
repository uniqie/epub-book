import { ColumnType, headAttributes } from "../interface"

type flatColumnsType<RecordType> = ColumnType<RecordType>[][]

type renderColumns<RecordType> = ColumnType<RecordType>[]
type renderColumnsWithDepth<RecordType> = (ColumnType<RecordType> & {
  depth: number
})[]

export default function useColumns<RecordType>(
  columns: ColumnType<RecordType>[],
  defaultColumnAttributes?: headAttributes
): [flatColumnsType<RecordType>, renderColumns<RecordType>] {
  if (!Array.isArray(columns)) {
    throw new Error("'columns' is invalid")
  }

  // columns层级结构
  const flatColumns: flatColumnsType<RecordType> = []
  // wait render columns
  const renderColumns: renderColumnsWithDepth<RecordType> = []

  // 深度遍历
  const depthSearch = (root: ColumnType<RecordType>, depth: number): number => {
    if (root) {
      // 赋值默认属性
      if (defaultColumnAttributes && !root.headAttributes) {
        root.headAttributes = { ...defaultColumnAttributes }
      }

      if (!flatColumns[depth]) {
        flatColumns[depth] = [root]
      } else {
        flatColumns[depth].push(root)
      }
    }
    if (root.children && root.children.length > 0) {
      let subColsLength = 0
      root.children.forEach((c) => {
        subColsLength += depthSearch(c, depth + 1)
      })
      if (root.headAttributes) {
        root.headAttributes.rowSpan = root.headAttributes.rowSpan || 1
        root.headAttributes.colSpan = subColsLength
      } else {
        root.headAttributes = {
          colSpan: subColsLength,
          rowSpan: 1,
        }
      }
      return subColsLength
    } else {
      renderColumns.push(
        Object.assign(root, { depth, colSpan: 1 }) as ColumnType<RecordType> & {
          depth: number
        }
      )
      return 1
    }
  }

  columns.forEach((root) => {
    const colSpan = depthSearch(root, 0)
    if (root.headAttributes) {
      root.headAttributes.colSpan = colSpan
    } else {
      root.headAttributes = { colSpan }
    }
  })

  renderColumns.forEach((renderColumn) => {
    if (!renderColumn.headAttributes?.rowSpan) {
      const rowSpan = flatColumns.length - renderColumn.depth
      if (renderColumn.headAttributes) {
        renderColumn.headAttributes.rowSpan = rowSpan
      } else {
        renderColumn.headAttributes = { rowSpan }
      }
    }
  })
  return [
    flatColumns as flatColumnsType<RecordType>,
    renderColumns as renderColumns<RecordType>,
  ]
}
