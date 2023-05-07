import React from 'react';
import WebcamImage from './components/Webcam';
import './App.css';
import LoadPhoto from './components/Cat_Images';


function App() {
  return (
    <div className='App'>
      <div className='row'>
        <div className='collumn'>
          <WebcamImage />
        </div>
        <div className='collumn'>
          <LoadPhoto />
        </div>
      </div>
    </div>
  );
}

export default App;