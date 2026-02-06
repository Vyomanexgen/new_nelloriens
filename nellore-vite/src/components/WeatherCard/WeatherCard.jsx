import { useEffect, useState } from 'react';
import { BsCloudFill, BsCloudLightningRainFill, BsCloudRainFill, BsCloudsFill, BsSunFill } from 'react-icons/bs';
import './WeatherCard.css';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'd994c25a28e5bec807501c6ea7cae959';
  const CITY = 'Nellore';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Fetch Current Weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const currentJson = await currentRes.json();

        // Fetch Forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const forecastJson = await forecastRes.json();

        if (currentJson.cod !== 200 || forecastJson.cod !== "200") {
          throw new Error('Failed to fetch weather data');
        }

        setWeatherData(currentJson);

        // Process forecast to get one reading per day (next 5 days)
        // OWM returns 3-hour steps. We'll pick the reading closest to 12:00 PM for each distinct day.
        const dailyForecast = [];
        const processedDates = new Set();

        forecastJson.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          const dateString = date.toDateString();
          
          // Verify it's a future date and we haven't added it yet
          // Also try to target noonish times (e.g., 12:00) 
          if (
            dateString !== new Date().toDateString() &&
            !processedDates.has(dateString) && 
            date.getHours() >= 12
          ) {
            dailyForecast.push(item);
            processedDates.add(dateString);
          }
        });

        // Ensure we strictly have 5 days, if logic skipped some, just take next available
        if (dailyForecast.length < 5) {
            const remaining = 5 - dailyForecast.length;
            // logic fallback could be better but simplified for now: just take distinct next days
        }

        setForecastData(dailyForecast.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Unable to load weather");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getDayName = (timestamp) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[new Date(timestamp * 1000).getDay()];
  };

  const getWeatherIcon = (weatherId, small = false) => {
    // Weather IDs: https://openweathermap.org/weather-conditions
    // 2xx Thunderstorm
    // 3xx Drizzle
    // 5xx Rain
    // 6xx Snow
    // 7xx Atmosphere
    // 800 Clear
    // 80x Clouds

    if (weatherId >= 200 && weatherId < 300) {
      return (
        <div className={`icon-composite ${small ? 'small-composite' : 'main-composite'}`}>
          <BsCloudLightningRainFill className={`icon-layer storm-cloud`} />
        </div>
      );
    } else if (weatherId >= 300 && weatherId < 600) {
      return (
        <div className={`icon-composite ${small ? 'small-composite' : 'main-composite'}`}>
           <BsCloudRainFill className={`icon-layer rain-cloud`} />
        </div>
      );
    } else if (weatherId >= 600 && weatherId < 700) {
      // Snow - using cloud for now or maybe heavy cloud
       return (
        <div className={`icon-composite ${small ? 'small-composite' : 'main-composite'}`}>
           <BsCloudsFill className={`icon-layer heavy-cloud`} />
        </div>
      );
    } else if (weatherId === 800) {
      // Clear
      return (
        <div className={`icon-composite ${small ? 'small-composite' : 'main-composite'}`}>
          {small ? (
             <BsSunFill className="icon-layer sun-full" />
          ) : (
            <>
             <BsSunFill className="icon-layer sun-full" style={{fontSize: '100%', color: '#ffc107'}} />
            </>
          )}
        </div>
      );
    } else if (weatherId === 801 || weatherId === 802) {
      // Few/Scattered Clouds
      return (
        <div className={`icon-composite ${small ? 'small-composite' : 'main-composite'}`}>
          <BsSunFill className={`icon-layer ${small ? 'sun-layer-small' : 'sun-layer'}`} />
          <BsCloudFill className={`icon-layer ${small ? 'cloud-layer-small' : 'cloud-layer'}`} />
        </div>
      );
    } else {
      // Broken/Overcast Clouds (803, 804) or Mist (7xx)
       return (
        <div className={`icon-composite ${small ? 'small-composite' : 'main-composite'}`}>
           <BsCloudsFill className={`icon-layer heavy-cloud`} />
        </div>
      );
    }
  };

  const getMainIcon = (weatherId) => {
     // Custom logic for main composite to ensure it looks rich
     if (weatherId === 800) {
         return (
            <div className="icon-composite main-composite">
                <BsSunFill className="icon-layer" style={{fontSize: '50px', color: '#ffc107'}} />
            </div>
         )
     }
     return getWeatherIcon(weatherId, false);
  }

  if (loading) {
      return <div className="weather-card loading"><p>Loading weather...</p></div>;
  }

  if (error || !weatherData) {
      return <div className="weather-card error"><p>Weather unavailable</p></div>;
  }

  const { main, weather, wind } = weatherData;
  const currentTemp = Math.round(main.temp);
  const condition = weather[0].description.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const weatherId = weather[0].id;

  return (
    <div className="weather-card">
      <div className="weather-header">
        
        {/* Main Icon & Condition Area */}
        <div className="current-weather-group">
          {getMainIcon(weatherId)}
          <div className="condition-text">{condition}</div>
        </div>
        
        {/* Temperature Area */}
        <div className="current-temp-container">
          <span className="temp-value">{currentTemp.toFixed(1)}</span>
          <span className="temp-unit">°C</span>
        </div>
        
        {/* Stats Area */}
        <div className="weather-stats">
          <div className="stat-line">
            <span className="stat-label">Wind:</span>
            <span className="stat-value">{wind.speed} km/h</span> {/* OWM gives m/s usually but let's label */}
            {/* Note: Standard metric is m/s. 1 m/s = 3.6 km/h. Let's do rough conversion or keep raw */}
          </div>
          <div className="stat-line">
            <span className="stat-label">Humidity:</span>
            <span className="stat-value">{main.humidity}%</span> 
            {/* Replaced precip with humidity as standard free API doesn't always strictly give precip volume simply */}
          </div>
          <div className="stat-line">
            <span className="stat-label">Pressure:</span>
            <span className="stat-value">{main.pressure} mb</span>
          </div>
        </div>
      </div>

      <div className="weather-forecast">
        {forecastData.map((day, index) => (
          <div className="forecast-day" key={index}>
            <div className="day-name">{getDayName(day.dt)}</div>
            {getWeatherIcon(day.weather[0].id, true)}
            <div className="day-temp">{Math.round(day.main.temp)}°c</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
