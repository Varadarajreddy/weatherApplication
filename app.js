const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {


    res.sendFile(__dirname + '/index.html');


    app.post('/', (req, res) => {
        console.log(req.body.cityName);
        const query = req.body.cityName;
        const apiKey = "d00f72cb2b752dc940778401a416bb48";
        const unit = "metric"

        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey


        https.get(url, function(response) {
            console.log(response.statusCode);
            response.on('data', function(data) {
                const weatherData = JSON.parse(data)
                const temp = weatherData.main.temp
                const desc = weatherData.weather[0].description
                const city = weatherData.name
                const icon = weatherData.weather[0].icon
                const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

                res.write("<p>The weather is currently " + desc + ".</p>")
                res.write("<h1>The temperature in " + city + " is " + temp + " degree celcius.</h1>")
                res.write("<img src=" + imageUrl + ">")
                res.end();
            })
        })

    })


})

app.listen(3002, function() {

    console.log('listening on port 3002');

})