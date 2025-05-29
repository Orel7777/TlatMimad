import { Html } from '@react-three/drei';
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <Html fullscreen>
      <div className="container">
        <div className="styled-wrapper">
          <div className="loader">
            <span />
          </div>
        </div>
      </div>
    </Html>
  )
}

export default Loader