import { useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { BlobWriter, TextWriter } from "@zip.js/zip.js"
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

const Frame = (props: FramePropsType) => {
  const { portal, item } = props
  const frameRef = useRef<HTMLIFrameElement>(null)
  // const [content, setContent] = useState()

  const {
    data: { entriesObj, rootPath },
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
          frameRef.current.setAttribute("src", URL.createObjectURL(file))
          URL.revokeObjectURL(blobUrl)
        }
      })
    }
  }, [item, entriesObj])

  const replaceLink = () => {
    if (frameRef.current) {
      const elements =
        frameRef.current?.contentWindow?.document.querySelectorAll("img[src]")
      elements?.forEach((ele) => {
        const href = ele.getAttribute("src")
        const link =
          rootPath && href?.startsWith(rootPath)
            ? rootPath
            : `${rootPath}/${href}`
        if (link && link in entriesObj) {
          // const linkUrl = URL.createObjectURL()
          entriesObj[link].getData?.(new BlobWriter()).then((blob) => {
            const file = new File([blob], item.id, {
              type: link.replace(/.*\./, "image/"),
            })

            const linkUrl = URL.createObjectURL(file)
            ele.setAttribute("src", linkUrl)
          })
        }
      })
    }
  }

  const children = (
    <CustomIframe
      className="w-full overflow-x-scroll"
      style={{  height: 'fit-content' }}
      title={item.id}
      ref={frameRef}
      onLoad={replaceLink}
    ></CustomIframe>
  )
  return portal ? createPortal(children, portal) : children
}

export default Frame
