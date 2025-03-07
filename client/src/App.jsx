// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Listen for changes in authentication state
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    
    window.addEventListener("storage", checkAuth); // Sync between tabs
    return () => window.removeEventListener("storage", checkAuth);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={<Layout />}
        >
            <Route index element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login"/>}/>
            <Route path='/register' element={<Register setIsAuthenticated={setIsAuthenticated} />}/>
            <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;