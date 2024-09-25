import { useContext, useRef } from "react" // eslint-disable-line
import { createPortal } from "react-dom"
import styled from "styled-components"

// import { ContentContext } from "../../config/ContentContext"

type FramePropsType = {
  portal?: Element | DocumentFragment
  page: string
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
  const { portal, page, item } = props
  const frameRef = useRef<HTMLIFrameElement>(null)

  const init = () => {
    if (frameRef.current) {
      const frameDocument = frameRef.current.contentDocument

      if (frameDocument) {
        const bodyScrollWidth = frameDocument.documentElement.scrollWidth
        frameRef.current.width = String(bodyScrollWidth)
        frameRef.current.setAttribute("class", "block h-screen shrink-0")
      }
    }
  }

  const children = (
    <CustomIframe
      sandbox="allow-same-origin"
      className="block w-full h-screen shrink-0"
      title={item.id}
      ref={frameRef}
      onLoad={init}
      src={page}
    />
  )
  return portal ? createPortal(children, portal) : children
}

export default Frame
