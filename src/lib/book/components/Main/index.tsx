import { useState } from "react"
import Epub from "@/lib/epub"

import Frame from "../Frame"

import {
  ContentContextProvider,
  Content,
  ThemeType,
} from "../../config/ContentContext"

type MainProps = {
  epub: Epub
  theme?: ThemeType
}

function Main(props: MainProps) {
  const { epub, theme } = props
  const [themeConfig, setThemeConfig] = useState(theme)

  return (
    <ContentContextProvider
      content={{
        theme: themeConfig,
        data: { entriesObj: epub.entriesObj },
      }}
    >
      <div
        className="absolute z-10 w-full h-full bg-white overflow-x-scroll "
        style={{ columnCount: 2 }}
      >
        {epub.getData().spine.map((spine) => {
          return <Frame item={spine} />
        })}
      </div>
    </ContentContextProvider>
  )
}

export default Main
