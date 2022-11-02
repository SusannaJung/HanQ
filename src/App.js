import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NavigationBar from "./components/NavigationBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route index element={<Home />} />
          <Route path={process.env.REACT_APP_DEFAULT_URL + "/"} element={<Home />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
