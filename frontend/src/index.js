import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import HomePage from './HomePage/HomePage';
import SignupPage from './SignupPage/SignupPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './SigninPage/SigninPage';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/signin' element={<SignInPage />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
