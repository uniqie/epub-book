import { EntriesObjType } from "@/lib/epub/types"
import { BlobWriter, TextWriter } from "@zip.js/zip.js"
import absoluteUrl from "../absoluteUrl"

import cssUrl from "./defaultStyleUrl"

type ItemType = {
  id: string
  href: string
  "media-type": string
}

async function buildPage(item: ItemType, entriesObj: EntriesObjType) {
  const pageEntry = entriesObj[item.href]

  const str = await pageEntry.getData?.(new TextWriter())
  if (!str) throw new Error("error page")

  const parser = new DOMParser()
  const document = parser.parseFromString(
    str,
    item["media-type"] as DOMParserSupportedType
  )

  const cssEle = document.createElement("link")
  cssEle.href = cssUrl
  cssEle.rel = "stylesheet"

  document.head.appendChild(cssEle)

  const links = document.head.querySelectorAll("link")
  const base = pageEntry.filename.split("/")
  base.pop()
  const baseUrl = base.join("/")

  Array.from(links).forEach((link) => {
    const path = absoluteUrl(link.getAttribute("href") || "", baseUrl)
    if (path in entriesObj) {
      entriesObj[path].getData?.(new BlobWriter()).then((blob) => {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
      })
    }
  })

  const imgElements = Array.from(document.querySelectorAll("image, img"))

  await Promise.all(
    imgElements.map((img) => {
      const href =
        img.getAttribute("href") ||
        img.getAttribute("src") ||
        img.getAttribute("xlink:href")

      const imgUrl = absoluteUrl(href || "", baseUrl)
      if (!href) return Promise.resolve()
      if (imgUrl in entriesObj && entriesObj[imgUrl]?.getData) {
        return entriesObj[imgUrl]
          ?.getData?.(new BlobWriter(imgUrl.replace(/.*\./, "image/")))
          .then((blob) => {
            const url = URL.createObjectURL(blob)
            img.setAttribute(img.hasAttribute("src") ? "src" : "href", url)
            if (img.hasAttribute("xlink:href")) {
              img.removeAttribute("xlink:href")
            }
          })
      }
      return Promise.resolve()
    })
  )

  document.querySelectorAll("svg").forEach((svg) => {
    svg.setAttribute("preserveAspectRatio", "xMidYMin meet")
  })

  // Array.from(document.links).forEach((a) => {
  //   const href = a.getAttribute("href")
  //   if (href && href.match(/.+#/)) {

  //   }
  // })

  return new XMLSerializer().serializeToString(document)
}

export default buildPage
