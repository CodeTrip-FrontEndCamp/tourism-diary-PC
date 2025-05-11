import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthRouter from "@/components/AuthRouter";
import Article from '@/pages/Article'
import Home from '@/pages/Home'

const router = createBrowserRouter([
  {
    path: "/",
    // element: <AuthRouter><Layout /></AuthRouter>,
    element: <Layout />,
    children: [
      {
        index: true, //默认二级路由
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
