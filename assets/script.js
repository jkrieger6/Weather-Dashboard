var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";
var $userInputEl = $("#userInput");

var weatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=$lat}&lon={lon}&units=imperial&appid=5b2b7b9a047f3cbe2fa1edd5d1203608";
var userFormEl = document.querySelector("#user-form");
// collects users input in the search and displays it into the search history
function addResult() {
  var cityInput = $userInputEl.val();
  // searchHistoryEl = getInfo();
  var searchCity = $("<div>");
  searchCity.attr("id", cityInput);
  searchCity.text(cityInput);
  searchCity.addClass("h4");

  // if (!searchHistoryEl.includes(cityInput)) {
  //     $("#search-history").append(searchCity)
  // }
  $("#current-weather").attr("style", "display:inline-block");
  getCityData(cityInput);
}

function getCityData(city) {
  var geoUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    APIKey;
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cityData = data[0];
      // console.log(cityData);
      var geoLatitude = cityData.lat;
      var geoLongitude = cityData.lon;
      getWeatherData(geoLatitude, geoLongitude);
    });
}

// add event listener to search history buttons
$("#searchBtn").on("click", addResult);
// $('#searchBtn').on("click", getWeather);

//add event listener to seach history items
// $("search-history").on("click", function (event) {
//   event.preventDefault();
//   $("current-weather").attr("style", "display:inline-block");
//   $userInputEl.value = event.target.id;
//   getResult();
// });

function getWeatherData(lat, lon) {
  // var $cityName = $("<h3>");
  // var $temperature = $("<div>");
  // var $humidity = $("<div>");
  // var $windSpeed = $("<div>");
  var $weatherIcon = $("<img>");
  // $weatherIcon.addClass("icon");
  // var dateTime = "<div>";

  // $(".forecast-five-day").empty();
  // $(".city").empty();
  // cityInput = $("userInput").val();

  // $(".city").addClass("list-group");
  // $(".city").append($cityName);
  // $(".city").append(dateTime);
  $("#current-weather").append($weatherIcon);
  // $(".city").append($temperature);
  // $(".city").append($windSpeed);
  // $(".city").append($humidity);

  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.list.length; i++) {
        var obj = data.list[i];
        if (obj.dt_txt.includes("00:00:00")) {
          console.log(obj);
        }
        var listItem = document.createElement("li");
        // listItem.textContent = data[i].html_url;
        $("list-group").append(listItem);
        if (i === 0) {
          var dateTime = obj.dt_txt;
          var tempData = obj.main.temp;
          var humData = obj.main.humidity;
          var windSpeedData = obj.wind.speed;
          var currentConditionsData = obj.weather[0].description;
          var weatherIcon = obj.weather[0].icon;
          imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
          $weatherIcon.attr('src',imgSrc);
          console.log(dateTime, tempData, humData, windSpeedData, currentConditionsData);

        }
      } 
      
      // var dateTime = data.list[0].dt_txt;
      // var tempData = data.list[0].main.temp;
      // var humData = data.list[0].main.humidity;
      // var windSpeedData = data.list[0].wind.speed;
      // var currentConditionsData = data.list[0].weather[0].description;
      // var weatherIcon = data.list[0].weather[0].icon;
      // imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      // $weatherIcon.attr('src',imgSrc)
      // console.log(data);
      // console.log(dateTime);
      // console.log("Currently " + tempData + "F");
      // console.log("With a humidty of " + humData + "%");
      // console.log("A wind speed of " + windSpeedData + "mph");
      // console.log(currentConditionsData);
    });
}
