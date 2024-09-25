import { BlobWriter, TextWriter } from "@zip.js/zip.js"
import Epub from "@/lib/epub"
import { absoluteUrl } from "../../utils"

async function transform(
  epub: Epub,
  config: {
    width: number
    height: number
  }
) {
  const entriesObj = epub.entriesObj
  const { spine } = epub.getData()

  const data: Promise<[(typeof spine)[0], string]>[] = []

  // 字符串->dom
  const parser = new DOMParser()
  // dom->字符串
  const XMLS = new XMLSerializer()

  spine.forEach((item) => {
    if (item.href in entriesObj) {
      const entry = entriesObj[item.href]
      entry.getData &&
        data.push(
          entry.getData(new TextWriter()).then(async (data) => {
            const path = item.href

            const document = parser.parseFromString(
              data,
              item["media-type"] as DOMParserSupportedType
            )

            const styleEle = document.createElement("style")

            styleEle.innerHTML = `
              html {
                width: ${config.width}px;
                height: ${config.height}px;

                column-count: 2;
                column-gap: 36px;
                column-fill: auto;
                column-rule-style: dotted;
              }
              body {
                padding: 24px 12px;
                paddingTop: 52px;
                width: 100vw;
                max-width: 100% !important;
                box-sizing: border-box;
                overflow-x: scroll;
              }

              img {
                max-width: 100% !important;
                max-height: ${config.height}px !important;
              }

              svg {
                max-width: 100% !important;
                max-height: ${config.height}px !important;
              }
              svg > image {
                max-height: ${config.height}px !important;
              }
            `

            document.head.appendChild(styleEle)

            const imgList = Array.from(
              document.querySelectorAll("image,img,link")
            )

            for (const ele of imgList) {
              const replaceLink = async (href: string): Promise<string> => {
                let fullUrl = absoluteUrl(href, path)

                if (fullUrl in entriesObj) {
                  const suffix = fullUrl.replace(/.*\./, "")
                  const type = suffix === "css" ? "text/css" : "image/" + suffix

                  return (
                    (await entriesObj[fullUrl]
                      .getData?.(new BlobWriter())
                      .then((blob) => {
                        return URL.createObjectURL(
                          new File([blob], entriesObj[fullUrl].filename, {
                            type: type,
                          })
                        )
                      })) || ""
                  )
                }
                return fullUrl
              }

              if (ele.getAttribute("xlink:href")) {
                const link = await replaceLink(
                  ele.getAttribute("xlink:href") || ""
                )
                ele.setAttribute("xlink:href", link)
              }
              if (ele.getAttribute("src")) {
                const link = await replaceLink(ele.getAttribute("src") || "")
                ele.setAttribute("src", link)
              }
              if (ele.getAttribute("href")) {
                const link = await replaceLink(ele.getAttribute("href") || "")
                ele.setAttribute("href", link)
              }
            }
            const doc = URL.createObjectURL(
              new File([XMLS.serializeToString(document)], item.id, {
                type: "text/html",
              })
            )
            return [item, doc]
          })
        )
    }
  })

  const pages = await Promise.all(data)

  console.log(pages)

  return pages
}

export { transform }
