const { log } = require ("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const wedesc = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.json({
                description: wedesc,
                temperature: temp,
                iconUrl: imageURL
            });

        });
    });
});

let port = process.env.PORT;

app.listen(port|| 5001, () => {
    console.log("server is running on" + port);
})