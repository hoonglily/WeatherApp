import React, {useState} from 'react';
import axios from 'axios';

function App() {

  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.7749&lon=-122.4194&appid=API_KEY`;
  
  return (
    <div className="app">
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>Dallas</p>
          </div>
          <div className='temp'>
            <h1>60 Degrees</h1>
          </div>
          <div className='description'>
            <p>Cloudy</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p>60 Degrees</p>
          </div>
          <div className='humidity'>
            <p>20%</p>
          </div>
          <div className='wind'>
            <p>12 MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
