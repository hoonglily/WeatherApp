import React, {useEffect, useState} from 'react';
import axios, { isCancel } from 'axios';
import defaultImage from './Assets/default.jpeg';
import clearSkyImage from './Assets/clearsky.jpeg';
import cloudImage from './Assets/clouds.jpeg';
import mistImage from './Assets/mist.jpeg';
import rainImage from './Assets/rain.jpeg';
import snowImage from './Assets/snow.jpeg';
import thunderstormImage from './Assets/thunderstorm.jpeg';
import hazeImage from './Assets/haze.webp';


function App({}) {
  const [data, setData] = useState ({});
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const units = isFahrenheit ? 'imperial' : 'metric';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;
          const response = await axios.get(url);
          setData(response.data);
          console.log('RESPONSE DATA:', response.data);

          const weatherDescription = response.data.weather?.[0]?.main;
          const backgroundPic = backgroundImages[weatherDescription] || backgroundImages.Default;
          setBackgroundImage(backgroundPic)
          console.log('weather Description:', weatherDescription)
          console.log('background pic: ',backgroundPic)
          console.log('default:',backgroundImages.Default)
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [location, isFahrenheit, apiKey]);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter'){
      setLocation(inputValue);
      // console.log('search for:', inputValue);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const toggleMetrics = () => {
    setIsFahrenheit(!isFahrenheit);
  }

  const backgroundImages = {
    'Clear': `url(${clearSkyImage})`,
    'Clouds': `url(${cloudImage})`,
    'Snow': `url(${snowImage})`,
    'Rain': `url(${rainImage})`,
    'Drizzle': `url(${rainImage})`,
    'Thunderstorm': `url(${thunderstormImage})`,
    'Mist': `url(${mistImage})`,
    'Haze': `url(${hazeImage})`,
    'Default': `url(${defaultImage})`,
  }

  return (
    <div className="app" style={{backgroundImage: backgroundImage}}>
      <div className='search'>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
          placeholder='Enter Location'
          type='text'/>
      </div>
      
      {data.name != undefined && (
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name || ''}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{isFahrenheit ? data.main?.feels_like.toFixed() + '°F'
              : data.main?.feels_like.toFixed() + '°C'}</h1> : null}
          </div>
          <div className='description'>
            <p>{data.weather?.[0]?.main}</p>
          </div>
          <div className='toggle'>
            <input 
            type='button' 
            value={isFahrenheit ? 'Fahrenheit' : 'Celsius'}
            className='button' 
            onClick={toggleMetrics}
            />
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            <p className='bold'>
              {isFahrenheit ? data.main?.feels_like.toFixed() + '°F'
                : data.main?.feels_like.toFixed() + '°C'} 
            </p>
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
      </div>
      )}
    </div>
  );
}

export default App;
