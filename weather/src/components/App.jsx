import React, { useEffect, useState } from 'react';
import { Header } from './Header'
import WeatherCard from './WeatherCard';
import CityCards from './CityCards';
import '../components/AppStyle.css'



const App = () => {
    const [searchedWeather, setSearchedWeather] = useState(null);
    const [predefinedWeather, setPredefinedWeather] = useState([])

    const predefinedCities = ["New York", "London", "Tokyo"]

    const fetchWeather = async (cityName) => {

        try {
            console.log(cityName);
            const response = await fetch("https://weatherapp-rywx.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    cityName: cityName,

                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSearchedWeather({
                    cityName: cityName,
                    description: data.description,
                    temperature: data.temperature,
                    iconUrl: data.iconUrl
                });
            } else {
                console.error("Error fetching weather data for", cityName);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        const fetchWeatherForPredefinedCities = async () => {
            try {
                const weatherResponses = await Promise.all(
                    predefinedCities.map((city) =>
                        fetch("https://weatherapp-rywx.onrender.com", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({ cityName: city }),
                        }).then((res) => res.json())
                    )
                );
                setPredefinedWeather(weatherResponses.map((data, index) => ({
                    cityName: predefinedCities[index], // Add the city name to the response data
                    description: data.description,
                    temperature: data.temperature,
                    iconUrl: data.iconUrl,
                }
                )));

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeatherForPredefinedCities();
    }, []);

    return (
        <div >
            <Header onSearch={fetchWeather} />
            <div className='card-container'>
                <WeatherCard weather={searchedWeather} />
                <CityCards cities={predefinedWeather}/>
            </div>
        </div>
    )

}
export default App;