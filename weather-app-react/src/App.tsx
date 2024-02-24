import React, {useEffect, useState, ChangeEvent, KeyboardEvent} from 'react';
import axios, { AxiosResponse } from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const defaultImage = require('./Assets/default.jpeg') as string;
const clearSkyImage = require('./Assets/clearsky.jpeg') as string;
const cloudImage = require('./Assets/clouds.jpeg') as string;
const mistImage = require('./Assets/mist.jpeg') as string;
const rainImage = require('./Assets/rain.jpeg') as string;
const snowImage = require('./Assets/snow.jpeg') as string;
const thunderstormImage = require('./Assets/thunderstorm.jpeg') as string;
const hazeImage = require('./Assets/haze.webp');

interface WeatherData {
  name?: string;
  main?: {
    feels_like?: number;
    humidity?: number;
  };
  weather?: Array<{ main?: string }>;
  wind?: { speed?: number };
}

interface BackgroundImages {
  [key: string]: string;
}

const backgroundImages: BackgroundImages = {
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

function App() {
  const [data, setData] = useState<WeatherData> ({});
  const [location, setLocation] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const units = isFahrenheit ? 'imperial' : 'metric';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;
          const response: AxiosResponse<WeatherData> = await axios.get(url);
          setData(response.data);
          console.log('RESPONSE DATA:', response.data);

          const weatherDescription = response.data.weather?.[0]?.main;
          const backgroundPic = backgroundImages[weatherDescription || ''] || backgroundImages.Default;
          setBackgroundImage(backgroundPic);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [location, isFahrenheit, apiKey]);

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      setLocation(inputValue);
      // console.log('search for:', inputValue);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const toggleMetrics = () => {
    setIsFahrenheit(!isFahrenheit);
  }

  return (
    <div className="app" style={{backgroundImage: backgroundImage}}>
      <div className='search'>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
          placeholder='Enter Location'
          type='text'
        />
      <SearchIcon className='search-icon'/>
      </div>
      
      {data.name !== undefined && (
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name || ''}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{isFahrenheit ? data.main.feels_like?.toFixed() + '°F'
              : data.main.feels_like?.toFixed() + '°C'}</h1> : null}
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
            <p className='bold-text'>
              {isFahrenheit ? data.main?.feels_like?.toFixed() + '°F'
                : data.main?.feels_like?.toFixed() + '°C'} 
            </p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            <p className='bold-text'>{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className='bold-text'>{data.wind?.speed?.toFixed()} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
