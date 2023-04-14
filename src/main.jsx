import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {UserProvider} from "./Context"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    
    <UserProvider>
    <Router >
    <App/>
    </Router>
    </UserProvider >
    
  ,
)
