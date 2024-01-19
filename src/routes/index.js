import { createHashRouter } from "react-router-dom";

import Home from "@pages/Home";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
