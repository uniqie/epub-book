import { createHashRouter } from "react-router-dom"

import Home from "@pages/Home"
import Example from "@pages/Example"
import Count from "@/pages/Example/Count"

const router = createHashRouter([
  {
    path: "/home",
    element: <Home />,
    children: [],
  },
  {
    path: "/example",
    element: <Example />,
    children: [
      {
        path: "count",
        element: <Count />,
      },
    ],
  },
])

export default router
