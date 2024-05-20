import { EntriesObjType } from "@/lib/epub/types"
import { createContext, useContext } from "react"

export interface ThemeType {
  className?: string
  style?: React.StyleHTMLAttributes<HTMLBaseElement>
}

export interface Content {
  theme?: ThemeType
  data: {
    entriesObj: EntriesObjType
    rootPath?: string
  }
}

const ContentContext = createContext<Content>({
  theme: {},
  data: {
    entriesObj: {},
  },
})

export const ContentContextProvider: React.FC<{
  content?: Content
  children: React.ReactNode
}> = ({ children, content }) => {
  const defaultConfig = useContext(ContentContext)
  return (
    <ContentContext.Provider
      value={content ? Object.assign(defaultConfig, content) : defaultConfig}
    >
      {children}
    </ContentContext.Provider>
  )
}

export { ContentContext }
