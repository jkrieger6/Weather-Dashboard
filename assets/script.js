var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";
var $userInputEl = $("#userInput");

//add event listener to search button
$("#searchBtn").on("click", addResult);

// collects users input in the search and displays it into the search history
function addResult(event) {
  event.preventDefault();
  var cityInput = $userInputEl.val();
  $("#current-weather").attr("style", "display:inline-block");
  getCityData(cityInput);
  addToSearchHistory(cityInput);
}

// add function to display searched city in search history container
function addToSearchHistory(cityInput) {
  var $list = $("#search-history");
  var $listItem = $("<li>").text(cityInput);
  $listItem.on("click", function() {
    getCityData(cityInput);
  });
  $list.append($listItem);
}

function getCityData(cityInput) {
  var geoUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput +
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
      getWeatherData(geoLatitude, geoLongitude, cityData.name);
    });
}

function renderCurrentWeather(weatherObj) {
  var dateTime = weatherObj.dt_txt;
  var tempData = weatherObj.main.temp;
  var humData = weatherObj.main.humidity;
  var windSpeedData = weatherObj.wind.speed;
  var currentConditionsData = weatherObj.weather[0].description;
  var weatherIcon = weatherObj.weather[0].icon;
  imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
  var $cityEl = $(".city");
  $cityEl.append($("<div>").text(dateTime));
  $cityEl.append($("<div>").text(" Temp: " + tempData + "F"));
  $cityEl.append($("<div>").text(" Humidity: " + humData + "%"));
  $cityEl.append($("<div>").text(" Wind Speed: " + windSpeedData + "mph"));
  $cityEl.append($("<div>").text(" Conditions: " + currentConditionsData));
  $cityEl.append($("<img>").attr("src", imgSrc));
}

function renderForecast(arrayOfWeatherObjects) {
  var $list = $(".forecast-five-day");
  for (let i = 0; i < arrayOfWeatherObjects.length; i++) {
    var obj = arrayOfWeatherObjects[i];
    var dateTime = obj.dt_txt;
    if (obj.dt_txt.includes("12:00:00")) {
      var $listItem = $("<li>");
      var tempData = Math.floor(obj.main.temp);
      var humData = obj.main.humidity;
      var windSpeedData = Math.floor(obj.wind.speed);
      var currentConditionsData = obj.weather[0].description;
      var weatherIcon = obj.weather[0].icon;
      imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      $listItem.append($("<div>").text(dateTime));
      $listItem.append($("<div>").text(" Temp: " + tempData + "F"));
      $listItem.append($("<div>").text(" Humidity: " + humData + "%"));
      $listItem.append(
        $("<div>").text(" Wind Speed: " + windSpeedData + "mph")
      );
      $listItem.append(
        $("<div>").text(" Conditions: " + currentConditionsData)
      );
      $listItem.append($("<img>").attr("src", imgSrc));
      $list.append($listItem);
    }
  }
}

function getWeatherData(lat, lon) {
  // $("#current-weather").empty();
  $("#current-weather").addClass("list-group");
  $("#current-weather").append($("<ol>"));
  $("#forecast").attr("style", "display:inline-block");

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
      var $list = $("#current-weather ol");
      console.log(data);
      renderCurrentWeather(data.list[0]);
      renderForecast(data.list);
    });
}
