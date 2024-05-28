import { useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { BlobWriter } from "@zip.js/zip.js"
import styled from "styled-components"

import { ContentContext } from "../../config/ContentContext"
import { buildPage } from "../../utils/pagePlugins"
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

  const {
    data: { entriesObj },
  } = useContext(ContentContext)

  useEffect(() => {
    const contentEntry = entriesObj[item.href]

    if (contentEntry?.getData) {
      contentEntry.getData(new BlobWriter(item["media-type"])).then((blob) => {
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
    buildPage(item, entriesObj).then((str) => {
      if (frameRef.current) {
        frameRef.current.srcdoc = str
      }
    })
  }, [item, entriesObj])

  // const init = () => {}

  const children = (
    <CustomIframe
      className="block w-full h-screen shrink-0"
      title={item.id}
      ref={frameRef}
      // onLoad={init}
    ></CustomIframe>
  )
  return portal ? createPortal(children, portal) : children
}

export default Frame
