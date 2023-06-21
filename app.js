const express = require("express");
const https = require("https");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.get("/404", function(req, res){
    res.send("Oops! Check the spellings and try later");
})
app.post("/", function(req, res){
    var placeName = req.body.place;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + placeName + "&units=metric&appid=04709ffbe062c19bf15252d923bec491";
    https.get(url, function(response){
        response.on("data", function(data){
            var d = JSON.parse(data);
            var tem = d.main.temp;
            var des = d.weather[0].description;
            var wind = d.wind.speed;
            var hum = d.main.humidity;
            res.render("index", {placename1 : placeName , temperature1 : tem , description1 : des , humidity1 : hum , windspeed1 : wind });
        })
    })
});
app.listen(process.env.PORT || 3000, function(){
    console.log("listening");
});