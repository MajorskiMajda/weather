import React, { useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';



export const Header = ({ onSearch }) => {

    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(typeof city);

        const trimmedCity = city.trim();

        const isValidCity = /^[A-Za-z\s]+$/.test(trimmedCity);

        if (!isValidCity || trimmedCity === "") {
            setError("Please enter a valid city name (letters and spaces only).");
        } else {
            setError(""); 
            onSearch(trimmedCity);  
            setCity(""); 
        }

    };

    return <div className='header-div'>
        <header>
            <h1><WbSunnyIcon /> Weather</h1>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="cityName" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search for a city" />
                    <button type='submit'><SearchIcon /></button>
                </form>
            </div>
        </header>
        <div className='error-div'>
            {error && <p className='error'><WarningAmberRoundedIcon />{error}</p>}
        </div>

    </div>
}
export default Header;