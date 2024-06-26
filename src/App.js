import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import ForgotPassword from "./pages/login/ForgotPassword";
import TransactionList from "./pages/home/TransactionList";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword/>: <Navigate to="/" />} />
            <Route path="/transactions/:category" element={user ? <TransactionList/>: <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
