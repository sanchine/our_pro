import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AuthPage } from './Pages/AuthPage/AuthPage';
import { PostsPage } from './Pages/PostsPage/PostsPage';
import { AddPage } from './Pages/AddPage/AddPage';
import { AdminPage } from './Pages/AdminPage/AdminPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AuthPage/>}/>
        <Route exact path="/posts" element={<PostsPage/>}/>
        <Route exact path="/add" element={<AddPage/>}/>
        <Route exact path="/228" element={<AdminPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

