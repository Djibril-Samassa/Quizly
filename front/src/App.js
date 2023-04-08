/*eslint-disable*/

import './App.css';
import { useState, useEffect, useContext, createContext } from 'react';
import jwt_decode from "jwt-decode"
import Header from './composants/Header';
import NotFound from './composants/NotFound';
import PrivateComponent from './composants/PrivateComponent';
import Authentification from './pages/Authentification';
import Accueil from './pages/Accueil';
import Quiz from './pages/Quiz';
import Profil from './pages/Profil';
import { Route, Routes, BrowserRouter, Navigate, Router, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Le token a expiré, déconnectez l'utilisateur
        setIsLoading(false)
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setToken(null);
      } else {
        // Le token est valide, connectez l'utilisateur
        setIsLoading(false)
        setIsLoggedIn(true);
      }
    } else {
      // Aucun token trouvé, déconnectez l'utilisateur
      setIsLoading(false)
      setIsLoggedIn(false);
    }
  }, [token]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      <BrowserRouter>
        <div>
          {isLoading ? null : <div className="App">
            {isLoggedIn ? <Header isLoggedIn={isLoggedIn} /> : null}
            <Routes>
              <Route path="/notFound" element={<NotFound />} />
              <Route path="/*" element={<Navigate to="/notFound" />} />
              <Route path="/" element={<PrivateComponent isLoggedIn={isLoggedIn} component={Accueil} />} />
              <Route path="/auth" element={<Authentification isLoggedIn={isLoggedIn} />} />
              <Route path="/profile" element={<PrivateComponent isLoggedIn={isLoggedIn} component={Profil} />} />
              <Route path="/quiz" element={<PrivateComponent isLoggedIn={isLoggedIn} component={Quiz} />} />
            </Routes>
          </div>}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
