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
                <Route path="/" element={<Navigate to="/MainShops" />} />
                <Route path="*" element={<Navigate to="/MainShops" />} />
                <Route
                  path="/MainShops"
                  element={<MainShops onLogout={() => setLoggedIn(false)} />}
                />
              </>
            )}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
