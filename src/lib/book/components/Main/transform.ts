import { DataType, EntriesObjType } from "@/lib/epub/types"
import { TextWriter } from "@zip.js/zip.js"
import postcss from "postcss"
import { absoluteUrl } from "../../utils"

type AssertType = {
  css: {
    [cssPath: string]: any
  }
  [name: string]: any
}

const asserts: AssertType = {
  css: {},
}

async function transform(
  chapters: DataType["spine"],
  entriesObj: EntriesObjType
) {
  const parser = new DOMParser()
  const serializer = new XMLSerializer()

  chapters.forEach((chapter) => {
    const contentEntry = entriesObj[chapter.href]

    const base = contentEntry.filename.split("/")
    base.pop()
    const baseUrl = base.join("/")

    if (contentEntry) {
      contentEntry.getData?.(new TextWriter()).then((htmlText) => {
        const contentDocument = parser.parseFromString(
          htmlText,
          chapter["media-type"] as DOMParserSupportedType
        )

        const cssAssertEles = Array.from(
          contentDocument.querySelectorAll("[rel=stylesheet]")
        )

        cssAssertEles.forEach((ele) => {
          const href = ele.getAttribute("href")
          if (href && baseUrl) {
            const cssPath = absoluteUrl(href, baseUrl)
            if (cssPath in entriesObj) {
              if (cssPath in asserts.css) {
                asserts.css[cssPath].scopes?.push(chapter.id)
              } else {
                asserts.css[cssPath] = {
                  scopes: [chapter.id],
                }
              }
            }
          }
        })

        if (asserts.css) {
          for (const [path, data] of Object.entries(asserts.css)) {
            if (path in entriesObj) {
              entriesObj[path].getData?.(new TextWriter()).then((cssText) => {
                const root = postcss.parse(cssText)
                root.walkDecls(/(background|background-image|src)/, (decl) => {
                  if (decl.value.includes("url")) {
                    debugger
                  }
                })
                root.walkAtRules((rule) => {
                  rule.walkDecls((decl) => {
                    if (decl.value.includes("url")) {
                      debugger
                    }
                  })
                })
              })
            }
          }
        }

        // cssAssertEles.forEach((ele) => {
        //   const href = ele.getAttribute("href")
        //   if (href && baseUrl) {
        //     const cssPath = absoluteUrl(href, baseUrl)
        //     if (cssPath in entriesObj) {
        //       if (cssPath in asserts.css) {
        //         asserts.css[cssPath].scopes?.push(chapter.id)
        //       } else {
        //         asserts.css[cssPath] = {
        //           scopes: [chapter.id],
        //         }
        //       }
        //     }
        //   }
        // })

        const chapterWrapperElement = contentDocument.createElement("div")
        chapterWrapperElement.setAttribute("id", chapter.id)

        chapterWrapperElement.innerHTML = contentDocument.body.innerHTML

        const htmlNodesStr = serializer.serializeToString(chapterWrapperElement)
      })
    }
  })
}

export default transform
