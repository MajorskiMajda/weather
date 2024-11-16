import express from 'express';  // Using ES Modules
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware
import https from 'https';

// Import to define __dirname for ES modules
import { fileURLToPath } from 'url';

// Set __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Use CORS middleware to allow requests from the frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle POST request for weather data
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.json({
        description: weatherDesc,
        temperature: temp,
        iconUrl: imageUrl,
      });
    });
  });
});

// Catch-all route to serve the React app (index.html) for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
