import logo from './logo.svg';
import './App.css';
import React from 'react';
import LaunchCard from './components/LaunchCard';
import { linkClasses } from '@mui/material';
import Comment from './components/Comment'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import LaunchDetail from './components/LaunchDetail';

export default function App() {

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="launch/:launchId" element={<LaunchDetail />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  )
}
