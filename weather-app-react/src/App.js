import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState ({});
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location && showResults) {
          const response = await axios.get(url);
          setData(response.data);
          console.log('RESPONSE DATA:', response.data);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [location, url, showResults]);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter'){
      setShowResults(true);
    }
  };

  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={handleEnterKey}
          placeholder='Enter Location'
          type='text'/>
      </div>
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
            <p className='bold'>60 Degrees</p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            <p className='bold'>20%</p>
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className='bold'>12 MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
