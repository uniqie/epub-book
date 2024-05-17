import { Entry } from "@zip.js/zip.js"

export type EntriesObjType = {
  [filename: string]: Entry
}

export type BasicInfoType = {
  // 书名
  name: string
  language: string
  author?: string[]
  identifier: string

  coveragePath: string
}

export type AsyncOperationHooksType = {
  onFinished?: (status: "success" | "failed") => void
  onSuccess?: Function
  onFailed?: (err?: Error) => void
}

export type DataType = {
  manifest: Array<{
    href: string
    id: string
    "media-type": string
  }>
  spine: Array<{
    href: string
    id: string
    "media-type": string
  }>
}

export type LoadStatusType = "loading" | "success" | "failed"
