import { useEffect, useState } from "react"
import Epub from "@/lib/epub"

import Frame from "../Frame"
import transform from "./transform"

import {
  ContentContextProvider,
  // Content,
  ThemeType,
} from "../../config/ContentContext"
import { createPortal } from "react-dom"

type MainProps = {
  epub: Epub
  theme?: ThemeType
  portal?: Element | DocumentFragment | null
}

function Main(props: MainProps) {
  const { epub, theme, portal } = props
  const [themeConfig, setThemeConfig] = useState(theme) // eslint-disable-line

  useEffect(() => {
    transform(epub.getData().spine, epub.entriesObj)
  }, [])

  const ele = (
    <ContentContextProvider
      content={{
        theme: themeConfig,
        data: { entriesObj: epub.entriesObj, rootPath: epub.packageRootPath },
      }}
    >
      <div
        className="absolute flex z-10 w-screen h-screen bg-white"
        style={{ overflowX: "scroll" }}
      >
        {/* {epub.getData().spine.map((spine, idx) => {
          return <Frame item={spine} key={idx} />
        })}  */}
      </div>
    </ContentContextProvider>
  )

  if (!portal) return ele

  return createPortal(ele, portal)
}

export default Main
