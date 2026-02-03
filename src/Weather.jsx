import { useState } from "react";
import InfoBox from "./InfoBox";
import Searchbox from "./Searchbox";

import Typography from '@mui/material/Typography';

export default function Weather() {
    const [weatherInfo, setWeatherInfo] = useState(null);


    const HOT_BG = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=1000";
    const RAIN_BG = "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1000";
    const COLD_BG = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1000";
    const DEFAULT_BG = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000";

    const getBgImage = () => {
        if (!weatherInfo) return DEFAULT_BG;
        if (weatherInfo.humidity > 80) return RAIN_BG;
        if (weatherInfo.temp > 15) return HOT_BG;
        return COLD_BG;
    };


    document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getBgImage()})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";


    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div style={{ textAlign: "center", minHeight: "100vh", padding: "20px" }}>
            <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mt: 2 }}>
                SkyCast
            </Typography>

            <Searchbox updateInfo={updateInfo} />

            {weatherInfo && <InfoBox info={weatherInfo} />}

            {!weatherInfo && (
                <Typography variant="h6" sx={{ color: "white", mt: 5 }}>
                    Search for a city to see the weather!
                </Typography>
            )}
        </div>
    )
}