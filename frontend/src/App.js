import React,{useEffect} from 'react'
import './App.css';
import {BrowserRouter, Navigate, Route,Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ToastContainer/>
        <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            {/* <Route path='*' element={<NotFound/> }/> */}
          </Routes>

          <Routes>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>

          <Routes>
            <Route path='/not-found' element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
