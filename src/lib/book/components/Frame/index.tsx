import { useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { BlobWriter } from "@zip.js/zip.js"
import styled from "styled-components"

import { ContentContext } from "../../config/ContentContext"
// import { getText } from "@/lib/unzip"

type FramePropsType = {
  portal?: Element | DocumentFragment
  item: {
    id: string
    href: string
    "media-type": string
  }
}

const CustomIframe = styled.iframe`
  html {
    background-color: wheat;
  }
`

let linkUrl: string

const css = `
    :root {
      --primary-color: blue;
    }  
  `
const blob = new Blob([css])
const file = new File([blob], "style.css", {
  type: "text/css",
})
linkUrl = URL.createObjectURL(file)

const Frame = (props: FramePropsType) => {
  const { portal, item } = props
  const frameRef = useRef<HTMLIFrameElement>(null)
  // const [content, setContent] = useState()
 
  const {
    data: { entriesObj },
  } = useContext(ContentContext)

  useEffect(() => {
    const contentEntry = entriesObj[item.href]

    if (contentEntry?.getData) {
      contentEntry.getData(new BlobWriter()).then((blob) => {
        if (frameRef.current) {
          const file = new File([blob], item.id, {
            type: item["media-type"],
          })
          const blobUrl = URL.createObjectURL(file)
          frameRef.current.setAttribute("src", blobUrl)
          URL.revokeObjectURL(blobUrl)
        }
      })
    }
  }, [item, entriesObj])

  const init = () => {
    _initPage()
  }

  const _initPage = () => {
    if (frameRef.current) {
      const frameDocument = frameRef.current.contentDocument
      const elements = frameDocument?.querySelectorAll("img[src]")
      elements?.forEach((ele) => {
        const href = ele.getAttribute("src") || ""
        if (href) {
          const link = href.replace("../", "")
          const path = Object.keys(entriesObj).find((key) => key.includes(link))

          if (path && entriesObj[path]) {
            entriesObj[path].getData?.(new BlobWriter()).then((blob) => {
              const file = new File([blob], item.id, {
                type: link.replace(/.*\./, "image/"),
              })

              const linkUrl = URL.createObjectURL(file)
              ele.setAttribute("src", linkUrl)
            })
          }
        }
      })

      if (frameDocument) {
        const linkEle = frameDocument.createElement("link")
        linkEle.href = linkUrl
        linkEle.rel = "stylesheet"

        frameDocument.head.appendChild(linkEle)

        const containerClientWidth = frameRef.current.parentElement?.clientWidth

        const styleEle = frameDocument.createElement("style")
        styleEle.innerHTML = `
          * {
            white-space: wrap;
          }
          html, body {
            margin: 0;
            padding: 0;
          }
        
          html {
            width: ${containerClientWidth}px;
            height: 100vh;

            column-count: 2;
            column-gap: 36px;
            column-fill: auto;
            column-rule-style: dotted;
          }
          body {
            padding: 24px 12px;
            width: 100vw;
            max-width: 100% !important;
            box-sizing: border-box;
            overflow-x: scroll;
          }

          svg {
            max-width: 100% !important;
            max-height: 100% !important;
          }
          svg > image {
            max-height: 100% !important;
          }
        `
        frameDocument.head.appendChild(styleEle)
        const bodyScrollWidth = frameDocument.documentElement.scrollWidth
        frameRef.current.width = String(bodyScrollWidth)
        frameRef.current.setAttribute("class", "block h-screen shrink-0")
      }
    }
  }

  const children = (
    <CustomIframe
      className="block w-full h-screen shrink-0"
      title={item.id}
      ref={frameRef}
      onLoad={init}
    ></CustomIframe>
  )
  return portal ? createPortal(children, portal) : children
}

export default Frame
