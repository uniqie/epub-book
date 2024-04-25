import { RequiredPointTag } from "./typeUtils"

// https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
type DCMITypes =
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

type ContainerConfigType = {
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
      attr_href: string
      attr_rel: string
      "attr_media-type"?: string
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
type MetaDataType = RequiredPointTag<
  {
    [P in DCMITypes as `dc:${P}`]?: Array<
      P extends HasOtherAttrKey
        ? CommonAttrType & OtherAttrType
        : CommonAttrType
    >
  },
  `dc:${MetaDataRequiredKey}`
> & {
  meta: Array<
    CommonAttrType &
      OtherAttrType & {
        attr_property: string
        attr_refines?: string
        attr_scheme?: string
      }
  >
  "OPF2 meta"?: any
  link: Array<{
    attr_href: string
    attr_hreflang: string
  }>
}

// The itemref element identifies an EPUB content document or foreign content document in the default reading order.
type ItemRefType = {
  attr_id?: string
  attr_idref: string
  attr_linear?: "yes" | "no"
  attr_properties?: string
}

type SpineType = {
  attr_id?: string
  "attr_page-progression-direction"?: "ltr" | "rtl"
  attr_toc?: string // Epub2历史遗留

  itemref: Array<ItemRefType>
}

type PackageConfigType = {
  // attributes
  attr_dir?: string
  attr_id?: string
  attr_prefix?: string
  "attr_xml:lang"?: string
  "attr_unique-identifier": string
  attr_version: string

  metadata: MetaDataType
  spine: SpineType
  
  collection?: {
    attr_dir?: string
    attr_id?: string
    attr_role: string
    "attr_xml:lang"?: string
  }
}

export { ContainerConfigType, PackageConfigType }
