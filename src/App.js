import logo from "./logo.svg";
import "./App.css";
import CustomerLogin from "./CustomerLogin";
import Customerregistor from "./Customer-registor";
import "react-toastify/dist/ReactToastify.css";
import WorkShopLogIn from "./WorkShopLogIn";
import WorkShopRegistor from "./WorkShopRegistor";
import MainShops from "./MainShops";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import spinnerSvc from "./services/spinnerSvc";
import LoaderSpinner from "./services/modal";
import { ToastContainer } from "react-toastify";
import ShopManage from "./Shopmanage";
import UserRequests from "./UserRequests";
import WorkshopProfile from "./Profile";
import UserProfile from "./UserProfile";
import ForgotPassword from "./ForgotPassword";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  useEffect(() => {
    const subscription = spinnerSvc.requestInProgress.subscribe((isLoading) =>
      setIsLoading(isLoading)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      {isLoading && <LoaderSpinner />}
      <div className="App">
        <Router>
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="*" element={<Navigate to="/" />} />
                <Route
                  path="/"
                  element={<CustomerLogin onLogin={() => setLoggedIn(true)} />}
                />
                <Route
                  path="/CustomerRegister"
                  element={<Customerregistor />}
                />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route
                  path="/WorkShopLogIn"
                  element={<WorkShopLogIn onLogin={() => setLoggedIn(true)} />}
                />
                <Route
                  path="/WorkShopRegister"
                  element={<WorkShopRegistor />}
                />
              </>
            ) : (
              <>
                {user?.role === "Customer" ? (
                  <>
                    <Route path="/" element={<Navigate to="/MainShops" />} />
                    <Route path="*" element={<Navigate to="/MainShops" />} />
                    <Route
                      path="/MainShops"
                      element={
                        <MainShops onLogout={() => setLoggedIn(false)} />
                      }
                    />
                    <Route
                      path="/UserRequests"
                      element={
                        <UserRequests onLogout={() => setLoggedIn(false)} />
                      }
                    />
                    <Route path="/profile" element={<UserProfile />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/Requests" />} />
                    <Route path="*" element={<Navigate to="/Requests" />} />
                    <Route path="/profile" element={<WorkshopProfile />} />
                    <Route
                      path="/Requests"
                      element={
                        <ShopManage onLogout={() => setLoggedIn(false)} />
                      }
                    />
                  </>
                )}
              </>
            )}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
