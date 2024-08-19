import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/all-posts"
        element={
          <Protected authentication>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected authentication>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Protected authentication>
            <EditPost />
          </Protected>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <Protected>
            <Post />
          </Protected>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
