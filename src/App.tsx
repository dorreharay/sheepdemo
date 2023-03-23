import './App.scss';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';

import Home from './pages/Home';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <main className="main">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </main>
  );
}

export default App;
