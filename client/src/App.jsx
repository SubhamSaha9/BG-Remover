import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/price" element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
