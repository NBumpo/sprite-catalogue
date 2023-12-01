import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import HomePage from './pages/HomePage/HomePage';
import AddSpritePage from './pages/AddSpritePage/AddSpritePage';

import userService from "./utils/userService";



export default function App() {
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin() {
    setUser(userService.getUser())
  }

  function logout() {
    userService.logout();
    setUser(null);
  }
  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />


      </Routes>




    )
  }




  return (
    <Routes>
      <Route path="/" element={<HomePage loggedUser={user} handleLogout={logout} handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/addsprite" element={<AddSpritePage loggedUser={user} handleLogout={logout} handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


