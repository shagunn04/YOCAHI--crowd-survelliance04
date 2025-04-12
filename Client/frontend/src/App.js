import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import UploadVideo from './UploadVideo';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="upload-video" element={<UploadVideo />} />
        </Route>
      </Routes>
 
  );
}

export default App;
