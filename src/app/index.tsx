import { RouterProvider } from "react-router-dom";
import { Routing } from "./routing";

export default function App() {
  return (
    <div className="max-w-3xl  h-dvh m-auto flex flex-col ">
      <RouterProvider router={Routing} />
    </div>
  );
}
