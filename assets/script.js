var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";
var city;
var state;
var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q={searchLocation}&limit=5&appid={APIKey}'
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=$lat}&lon={lon}&units=imperial&appid={APIKey}"

fetch(weatherUrl)
.then(response => response.json())
.then(data => {
    var forecastData = data.list;

    forecastDataforEach(item => {
        var date = new Date(item.dt_txt);
        var time = date.toLocaleTimeString();
        var temp = item.main.temp;
        var description = item.weather[0].description;
  
})