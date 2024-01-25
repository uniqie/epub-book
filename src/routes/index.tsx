import { createHashRouter } from "react-router-dom"

import Home from "@pages/Home"
import Example from "@pages/Example"

const router = createHashRouter([
  {
    path: "/home",
    element: <Home />,
    children: [],
  },
  {
    path: "/example",
    element: <Example />,
  },
])

export default router
