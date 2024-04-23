import { Entry } from "@zip.js/zip.js"

type RequiredPointTag<T, K> =
  (
    {
      [P in Extract<keyof T, K>]: NonNullable<T[P]>
    } & {
      [U in Exclude<keyof T, K>]?: T[U]
    })

// https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
export type DCMITypes =
  | "contributor"
  | "coverage"
  | "creator"
  | "date"
  | "description"
  | "format"
  | "identifier"
  | "language"
  | "publisher"
  | "relation"
  | "rights"
  | "source"
  | "subject"
  | "title"
  | "type"

export type EntriesObj = {
  [filename: string]: Entry
}

export type ContainerConfigType = {
  container: {
    attr_version: string
    rootfiles: {
      rootfile: {
        "attr_full-path": string
        "attr_media-type": string
      }
    }[]
  }
  links?: {
    link: {
      href: string
      rel: string
      "media-type": string
    }[]
  }
}

type MetaDataRequiredKey = `dc:${"identifier" | "title" | "language"}`

// https://www.w3.org/TR/epub-33/#sec-package-elem
type MetaDataType = RequiredPointTag<
  {
    [P in `dc:${DCMITypes}`]?: string
  },
  MetaDataRequiredKey
>

export type         PackageConfigType = {
  // attributes
  attr_dir?: string
  attr_id?: string
  attr_prefix?: string
  "attr_xml:lang"?: string
  "attr_unique-identifier": string
  attr_version: string
  metadata: MetaDataType

  collection?: {
    attr_dir?: string
    attr_id?: string
    attr_role: string
    "attr_xml:lang"?: string
  }
}
