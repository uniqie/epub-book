import { createHashRouter } from "react-router-dom"

import Home from "@pages/Home"
import Example from "@pages/Example"
import Count from "@/pages/Example/Count"
import EpubInput from "@pages/Example/EpubInput"

const router = createHashRouter([
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "count",
        element: <Count />,
      },
      {
        path: "epub",
        element: <EpubInput />,
      },
    ],
  },
  {
    path: "/example",
    element: <Example />,
    children: [
      {
        path: "count",
        element: <Count />,
      },
      {
        path: "epub",
        element: <EpubInput />,
      },
    ],
  },
])

export default router
