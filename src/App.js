import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/notifications" component={Notifications} />
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
