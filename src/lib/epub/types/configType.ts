import { RequiredPointTag, ArrayOrObj, Attrs } from "./typeUtils"

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
  container: Attrs<{
    version: string
  }> & {
    rootfiles: {
      rootfile: Attrs<{
        "full-path": string
        "media-type": string
      }>
    }[]
  }
  links?: {
    link: Attrs<{
      href: string
      rel: string
      "media-type"?: string
    }>[]
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

type CommonTagType = {
  value?: string
} & Attrs<{}>

type UseAttributeType<T = false> = T extends true
  ? {
      id?: string
      dir?: "ltr" | "rtl" | "default"
      "xml:lang"?: string
    }
  : { id?: string }

// https://www.w3.org/TR/epub-33/#sec-package-elem
export type MetaDataType = RequiredPointTag<
  {
    [P in DCMITypes as `${P}`]?: ArrayOrObj<
      CommonTagType &
        (P extends HasOtherAttrKey
          ? Attrs<UseAttributeType<true>>
          : Attrs<UseAttributeType>)
    >
  },
  `${MetaDataRequiredKey}`
> & {
  meta: ArrayOrObj<
    CommonTagType &
      Attrs<
        UseAttributeType<true> & {
          property: string
          refines?: string
          scheme?: string
        }
      >
  >
  "OPF2 meta"?: any
  link: ArrayOrObj<
    Attrs<{
      href: string
      hreflang: string
    }>
  >
}

// The itemref element identifies an EPUB content document or foreign content document in the default reading order.
type ItemRefType = Attrs<{
  id?: string
  idref: string
  linear?: "yes" | "no"
  properties?: string
}>

type SpineType = Attrs<{
  id?: string
  "page-progression-direction"?: "ltr" | "rtl"
  toc?: string // Epub2历史遗留
}> & {
  itemref: ArrayOrObj<ItemRefType>
}

type ManiFestType = {
  item: ArrayOrObj<
    Attrs<{
      id: string
      href: string
      "media-type": string
      "media-overlay"?: string
      properties?: string
    }>
  >
}

type PackageConfigType = {
  package: Attrs<{
    // attributes
    dir?: string
    id?: string
    prefix?: string
    "xml:lang"?: string
    "unique-identifier": string
    version: string
  }> & {
    metadata: MetaDataType
    spine: SpineType
    manifest: ManiFestType

    collection?: Attrs<{
      dir?: string
      id?: string
      role: string
      "xml:lang"?: string
    }>
  }
}

export { ContainerConfigType, PackageConfigType }
