import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Searchbox.css"
import { useState } from 'react';

export default function Searchbox({ updateInfo }) {
    let [city, setCity] = useState("")
    let [error, seterror] = useState(false)

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = import.meta.env.VITE_API_KEY;

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            //console.log(jsonResponse);
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            }
            //console.log(result);
            return result;
        } catch (err) {
            throw err;
        }

    }

    let handleInput = (event) => {
        setCity(event.target.value);
        seterror(false);

    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo); //function in weather.jsx
        } catch (err) {
            seterror(true);
        }

    }
    return (
        <div className='searchbox'>
            <h3>Search for weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City-name"
                    variant="outlined"
                    value={city}
                    onChange={handleInput}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "gray" },
                            "&:hover fieldset": { borderColor: "blue" },
                        }
                    }}
                />
                
                <Button variant="contained" type="submit" >
                    Search
                </Button>
            </form>


            {error && <p style={{ color: "red", fontWeight: "bold" }}>No such place exists in our records!</p>}

        </div>
    )
}