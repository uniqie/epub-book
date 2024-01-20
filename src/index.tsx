import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import router from "./routes"
import "./style/globals.css"

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

const rootEle = document.getElementById("root") as HTMLDivElement
rootEle.className = twMerge(["h-screen"])

const root = createRoot(rootEle)
root.render(<App />)
