import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";
import Login from "../pages/Login";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/admin",
      element: <App />,
      children: routeGenerator(adminPaths),
    },
    {
      path: "/faculty",
      element: <App />,
      children: routeGenerator(facultyPaths),
    },
    {
      path: "/student",
      element: <App />,
      children: routeGenerator(studentPaths),
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
    },
  }
);

export default router;
