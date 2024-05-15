import { createContext, useContext } from "react"

export interface ThemeConfig {
  className?: string
  style?: React.StyleHTMLAttributes<HTMLBaseElement>
}

const ThemeConfigContext = createContext<ThemeConfig>({})

export const ThemeConfigContextProvider: React.FC<{
  config?: ThemeConfig
  children: React.ReactNode
}> = ({ children, config }) => {
  const originDisabled = useContext(ThemeConfigContext)
  return (
    <ThemeConfigContext.Provider value={config ?? originDisabled}>
      {children}
    </ThemeConfigContext.Provider>
  )
}

export { ThemeConfigContext }
