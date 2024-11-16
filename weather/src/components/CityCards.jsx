import React from 'react';
import '../components/CityCardsStyle.css'
import WeatherCard from './WeatherCard';

const CityCards = ({cities}) => {
    return (
        <div className="city-div">
        {cities.map((city, index) => (
            <WeatherCard className="grr" key={index} weather={city} />
        ))}
    </div>
    )
}
export default CityCards;