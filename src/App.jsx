import React from "react";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;
