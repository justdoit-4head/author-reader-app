import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import SpinLoader from "./components/Loaders/SpinLoader";
import NotFound from "./components/Errors/NotFound";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import Home from "./components/Home/Home";
import Header from "./components/Home/Navbar/Header";
import AddBook from "./components/Home/Layouts/AddBook";
import EditBook from "./components/Home/Layouts/EditBook";

function App() {
  const { pathname } = useLocation();

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div className="">
      <ToastContainer />
      <Suspense fallback={<SpinLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/addbook"
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          />

          <Route
            path="/editbook/:id"
            element={
              <PrivateRoute>
                <EditBook />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
