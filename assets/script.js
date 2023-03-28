var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";
var userInputEl = document.getElementById("userInput");
var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q={searchLocation}&limit=5&appid=5b2b7b9a047f3cbe2fa1edd5d1203608'
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=$lat}&lon={lon}&units=imperial&appid=5b2b7b9a047f3cbe2fa1edd5d1203608"
var userFormEl = document.querySelector('#user-form');
// collects users input in the search and displays it into the search history
function addResult() {
    cityInput = document.getElementById("userInput").value;
    searchHistoryEl = getInfo();
    var searchCity = $("<div>")
    searchCity.attr('id', cityInput)
    searchCity.text(cityInput)
    searchCity.addClass("h4")

    if (searchHistoryEl.includes(cityInput) == false) {
        getElementById("search-history").append(searchCity)
    }
   getElementById("current-weather").attr("style", "display:inline-block")
   addInfo(cityInput);
};

function getWeather() {
    
}
// add event listener to search history buttons
document.getElementById('searchBtn').on("click", addResult);
document.getElementById('searchBtn').on("click", getWeather);

//add event listener to seach history items
document.getElementById("search-history").on('click', function(event) {
event.preventDefault();
document.getElementById("current-weather").attr('style', "display:inline-block")
userInputEl.value = event.target.id;
getResult();
});



var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityInput = city.value.trim();
    if (cityInput) {
        getCity(cityInput);
        searchHistoryEl
    }
}
fetch(weatherUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
    
  var forecastData = data.list;
    forecastDataforEach(item => {
        var date = new Date(item.dt_txt);
        var time = date.toLocaleTimeString();
        var temp = item.main.temp;
        var description = item.weather[0].description;
    })
