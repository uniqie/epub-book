import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Theme } from "@radix-ui/themes"

import router from "./routes"
import "@radix-ui/themes/styles.css"

function App() {
  return (
    <Theme>
      <RouterProvider router={router}></RouterProvider>
    </Theme>
  )
}

const root = createRoot(document.getElementById("root"))

root.render(<App />)
