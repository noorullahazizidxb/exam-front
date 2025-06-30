import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card text-card-foreground p-4 shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">Notify</Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/notifications" className="text-muted-foreground hover:text-primary">Notifications</Link>
              <button onClick={handleLogout} className="text-muted-foreground hover:text-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted-foreground hover:text-primary">Login</Link>
              <Link to="/register" className="text-muted-foreground hover:text-primary">Register</Link>
            </>
          )}
          <button onClick={toggleDarkMode} className="text-muted-foreground hover:text-primary">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
