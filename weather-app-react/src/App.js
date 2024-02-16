import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App({}) {
  const [data, setData] = useState ({});
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const response = await axios.get(url);
          setData(response.data);
          console.log('RESPONSE DATA:', response.data);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [location, url]);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter'){
      setLocation(inputValue);
      console.log('search for:', inputValue);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <div className="app">
      <div className='search'>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
          placeholder='Enter Location'
          type='text'/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name || ''}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main?.temp.toFixed()}°F</h1> : null}
          </div>
          <div className='description'>
            <p>{data.weather?.[0]?.main}</p>
          </div>
        </div>

        {data.name != undefined && (
        <div className='bottom'>
          <div className='feels'>
            <p className='bold'>{data.main?.feels_like.toFixed()}°F</p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            <p className='bold'>{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className='bold'>{data.wind?.speed.toFixed()} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
