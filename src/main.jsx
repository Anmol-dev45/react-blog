import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import appwriteService from "./appwrite/config";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Protected } from "./components";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Login,
  Post,
  Signup,
} from "./pages";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
        loader: async () => {
          try {
            const data = await appwriteService.getPosts();
            return data.total > 0 ? data.documents : [];
          } catch (error) {
            console.log(error);
            return [];
          }
        },
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Protected>
            <Post />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
