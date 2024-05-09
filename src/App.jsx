import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Routes
import Home from "./pages/Home";
import Details from "./pages/Details";
import CheckOut from "./pages/CheckOut";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilterSidebar from "./components/FilterSidebar";

function App() {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
        <Sidebar />
        <FilterSidebar />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
