import { Entry } from "@zip.js/zip.js"

type RequiredPointTag<T, K> = {
  [P in Extract<keyof T, K>]: NonNullable<T[P]>
} & {
  [U in Exclude<keyof T, K>]?: T[U]
}

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

type MetaDataRequiredKey = "identifier" | "title" | "language"

type HasOtherAttrKey =
  | "title"
  | "contributor"
  | "coverage"
  | "creator"
  | "description"
  | "publisher"
  | "relation"
  | "rights"
  | "subject"

type CommonAttrType = {
  attr_id?: string
  "#text"?: string
}

type OtherAttrType = {
  attr_dir?: "ltr" | "rtl" | "default"
  "attr_xml:lang"?: string
}
// https://www.w3.org/TR/epub-33/#sec-package-elem
type MetaDataType = RequiredPointTag<{
  [P in DCMITypes as `dc:${P}`]?: Array<
    P extends HasOtherAttrKey ? CommonAttrType & OtherAttrType : CommonAttrType
  >
}, `dc:${MetaDataRequiredKey}`> & {
  meta: Array< CommonAttrType & OtherAttrType & {
    attr_property: string
    attr_refines?: string
    attr_scheme?: string  
  }>
  "OPF2 meta"?: any
  link: Array<{
    attr_href: string
    attr_hreflang: string
  }>
}

export type PackageConfigType = {
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
