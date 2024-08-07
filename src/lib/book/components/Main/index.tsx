import { useEffect, useRef, useState } from "react"
import Epub from "@/lib/epub"

import Frame from "../Frame"
import { transform } from "./transform"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { epub, theme, portal } = props
  const [themeConfig, setThemeConfig] = useState(theme) // eslint-disable-line

  const [pages, setPages] = useState<
    [ReturnType<typeof epub.getData>["spine"][0], string][]
  >([])

  useEffect(() => {
    if (containerRef.current) {
      transform(epub, {
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      }).then(setPages)
    }
  }, [containerRef, epub])

  const ele = (
    <ContentContextProvider
      content={{
        theme: themeConfig,
        data: { entriesObj: epub.entriesObj, rootPath: epub.packageRootPath },
      }}
    >
      <div
        ref={containerRef}
        className="absolute flex z-10 w-screen h-screen bg-white overflow-x-scroll"
      >
        {pages?.length > 0 &&
          pages?.map(([item, page], idx) => {
            return <Frame item={item} page={page} key={idx} />
          })}
      </div>
    </ContentContextProvider>
  )

  if (!portal) return ele

  return createPortal(ele, portal)
}

export default Main
