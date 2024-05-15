import { useContext, useRef, useState } from "react"
import { createPortal } from "react-dom"

type FramePropsType = {
  portal: Element | DocumentFragment
}

type stateType = {
  
}

const Frame = ({ portal }: FramePropsType) => {
  const frameRef = useRef(null)

  

  const children = <iframe title="123" ref={frameRef}></iframe>
  return portal ? createPortal(children, portal) : children
}

export default Frame
