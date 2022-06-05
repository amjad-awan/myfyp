import logo from './logo.svg';
import './App.css';
import CustomerLogin from './CustomerLogin';
import Customerregistor from './Customer-registor';
import WorkShopLogIn from "./WorkShopLogIn"
import WorkShopRegistor from "./WorkShopRegistor"
import MainShops from './MainShops';
import Shopmanage from './Shopmanage';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CustomerLogin/>} />
          <Route path="/Customerregister" element={<Customerregistor/>} />
          <Route path="/WorkShopLogIn" element={<WorkShopLogIn/>} />
          <Route path="/WorkShopRegistor" element={<WorkShopRegistor/>} />
          <Route path="/MianShops" element={<MainShops/>} />
          <Route path="/Shopmanage" element={<Shopmanage/>} />
          </Routes>
          </Router>
    </div>
  );
}

export default App;
