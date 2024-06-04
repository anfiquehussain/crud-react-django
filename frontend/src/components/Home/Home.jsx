import React from 'react';
import './Home.css'; // Import the CSS file for styles
import Display from '../Display/Display';
import AddProduct from '../Create/AddProduct'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Update from '../Update/Update';
import Delete from '../Delete/Delete';



function Home() {
  return (
    <>
      <div>
        <center>
          <Navbar/>
        </center>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
        </Routes>
        </BrowserRouter>
        
      </div>
    </>
  );
}

export default Home;
