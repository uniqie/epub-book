import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./routes";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}


const root = createRoot(document.getElementById("root"));

root.render(<App />);
