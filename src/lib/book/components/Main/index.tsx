import { useState } from "react"
import { ThemeConfigContextProvider } from "../../config/ThemeConfigContext"

function Main() {
  const [themeConfig, setThemeConfig] = useState({
    
  })

  return (
    <ThemeConfigContextProvider config={themeConfig}>
      {123}
    </ThemeConfigContextProvider>
  )
}

export default Main
