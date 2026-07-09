import "./App.css";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ErrorPage from "./pages/Error";
import DashboardPage from "./pages/dashboard";
import BalancePage from "./pages/balance";
import ExpensesPage from "./pages/expenses";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const NotRequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : children;
};

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <NotRequireAuth>
        <SignInPage />
      </NotRequireAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <NotRequireAuth>
        <SignUpPage />
      </NotRequireAuth>
    ),
  },
  {
    path: "/balance",
    element: (
      <RequireAuth>
        <BalancePage />
      </RequireAuth>
    ),
  },
  {
    path: "/expense",
    element: (
      <RequireAuth>
        <ExpensesPage />
      </RequireAuth>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;