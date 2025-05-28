import React from 'react'
import './index.css';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Room from './pages/Room';
import Poster from './pages/poster/Poster';
import Poster2 from './pages/poster/Poster2';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<Room />} />
        <Route path="/poster" element={<Poster />} />
        <Route path="/poster2" element={<Poster2 />} />
      </Routes>
    </Router>
  )
}

export default App
