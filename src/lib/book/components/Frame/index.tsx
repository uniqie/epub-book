import { useContext, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { ContentContext } from "../../config/ContentContext"
// import { getText } from "@/lib/unzip"
import { BlobReader, BlobWriter, ZipFileEntry } from "@zip.js/zip.js"

type FramePropsType = {
  portal?: Element | DocumentFragment
  item: {
    id: string
    href: string
    "media-type": string
  }
}

// type stateType = {}

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
          frameRef.current.setAttribute("src", URL.createObjectURL(file))
          URL.revokeObjectURL(blobUrl)
        }
      })
    }

    // zipEntry.getBlob()
    // const blobUrl = URL.createObjectURL(contentEntry.getData(new BlobWriter))

    // getText(contentEntry).then((text) => {
    //   const blobUrl = URL.createObjectURL(text)

    //   // if (frameRef.current) {
    //   //   frameRef.current.innerHTML = "<p>Hello, world!</p>"
    //   // }
    // })
  }, [item, entriesObj])

  const children = (
    <iframe
      className="h-full overflow-x-scroll"
      // style={{ columnCount: 2 }}
      title={item.id}
      ref={frameRef}
    ></iframe>
  )
  return portal ? createPortal(children, portal) : children
}

export default Frame
