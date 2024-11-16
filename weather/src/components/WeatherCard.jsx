import React from 'react';
import '../components/WeatherCardStyle.css';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
  
  const WeatherCard = ({ weather }) => {
    if (!weather) {
      return <div className="loading"><AutorenewRoundedIcon className='ikon' />
        <p>
          please search for a city
        </p>
      </div>;
    }
  
    const { cityName, temperature, description, iconUrl } = weather;
  

    return (
        <div className="card">
            <img src={iconUrl} alt={description || "Weather Icon"} />
            <div  className='weather-info'>
                <h1>{cityName}</h1>
                <h1>{Math.round(temperature)} °C</h1>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default WeatherCard;