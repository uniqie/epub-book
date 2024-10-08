import { createBrowserRouter } from "react-router-dom"

import Home from "@pages/Home"
import EpubInput from "@pages/Example/EpubInput"

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "epub",
        element: <EpubInput />,
      },
    ],
  },
])

export default router
