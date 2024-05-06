import Epub from "@/lib/epub"
import { getBase64 } from "@/lib/unzip"
import { MetaDataType } from "@/lib/epub/types/configType"

import { convertArrOrObjToArr } from "../utils"
import { BookBasicInfoType } from "../types"

export function parseOptions(params: any) {}

export function parseEpubConfig(epub: Epub): BookBasicInfoType {
  const { packageConfig } = epub.getConfig()

  if (packageConfig) {
    const { metadata, manifest } = packageConfig.package

    const basicInfo: BookBasicInfoType = {
      identifier: convertArrOrObjToArr(metadata["identifier"])[0]?.value || "",
    }
    const attrNames = Object.keys(metadata)
    
    attrNames.forEach(async (attrName) => {
      const name = attrName as keyof MetaDataType
      switch (name) {
        case "title":
          const titleEle = convertArrOrObjToArr(metadata[name])
          basicInfo.name = titleEle[0]?.value
          break
        case "creator":
          const creatorEle = convertArrOrObjToArr(metadata[name])
          basicInfo.author = creatorEle
            .map((e) => e?.value || "")
            .filter((value) => Boolean(value))
          break
        case "language":
          const languageEle = convertArrOrObjToArr(metadata[name])
          basicInfo.language = languageEle[0]?.value || ""
          break
        case "meta":
          const metaEle = convertArrOrObjToArr(metadata[name]) as any
          // @ts-ignore
          const coverId = metaEle.find((m) => m.attrs?.name === "cover")?.attrs
            ?.content
          const coverItem = convertArrOrObjToArr(manifest.item).find(
            (item) => item.attrs.id === coverId
          )
          const coverPosition =
            epub.packageRootPath + "/" + coverItem?.attrs.href

          if (coverPosition && epub.entriesObj[coverPosition]) {
            basicInfo.cover = await getBase64(
              epub.entriesObj[coverPosition],
              coverItem?.attrs["media-type"]
            )
          }
          break
        default:
          break
      }
    })
    return basicInfo
  } else {
    throw new Error("failed parse packageConfig ")
  }
}
