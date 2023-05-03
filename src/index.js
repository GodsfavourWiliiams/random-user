import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import returnStore from "./Logic/store/index";
import App from "./App";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page.jsx";
import UserDetails from "./pages/userDetail";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: ":id",
    element: <UserDetails />
  }
]);

root.render(
  <StrictMode>
    <Provider store={returnStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
