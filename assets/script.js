var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";
var $userInputEl = $("#userInput");
var userFormEl = document.querySelector("#user-form");

//add event listener to search button
$("#searchBtn").on("click", addResult);
// collects users input in the search and displays it into the search history
function addResult() {
  var cityInput = $userInputEl.val();
  getCityData(cityInput);
  // searchHistoryEl = getInfo();
  var searchCity = $("<div>");
  searchCity.attr("id", cityInput);
  searchCity.text(cityInput);
  searchCity.addClass("<h4>");

  $("#current-weather").attr("style", "display:inline-block");
  getCityData(cityInput);
  $("#forecast").attr("style", "display:inline-block");
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
      getWeatherData(geoLatitude, geoLongitude, cityData.name);
    });
}

function getWeatherData(lat, lon) {
  var $cityName = $("<h3>");
  var $temperature = $("<div>");
  var $humidity = $("<div>");
  var $windSpeed = $("<div>");
  var $weatherIcon = $("<img>");
  var $conditions = $("<div>");

  $("#current-weather").empty();
  $("#current-weather").addClass("list-group");
  $("city").append($cityName);
  $("#current-weather").append($weatherIcon);
  $("#current-weather").append($("<ol>"));

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
      // var currentDate = new Date();
      // var currentDay = currentDate.getDay()
      var $list = $("#current-weather ol");
      for (let i = 0; i < data.list.length; i++) {
        var obj = data.list[i];
        if (obj.dt_txt.includes("00:00:00")) {
          var $listItem = $("<li>");
          var tempData = Math.floor(obj.main.temp);
          var humData = obj.main.humidity;
          var windSpeedData = Math.floor(obj.wind.speed);
          var currentConditionsData = obj.weather[0].description;
          var weatherIcon = obj.weather[0].icon;
          imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
          // $listItem.append($("<span>").text(dateTime));
          $listItem.append($("<span>").text(" Temp: " + tempData + "F"));
          $listItem.append($("<span>").text(" Humidity: " + humData + "%"));
          $listItem.append(
            $("<span>").text(" Wind Speed: " + windSpeedData + "mph")
          );
          $listItem.append(
            $("<span>").text(" Conditions: " + currentConditionsData)
          );
          $listItem.append($("<img>").attr("src", imgSrc));
          $list.append($listItem);
        }

        // listItem.textContent = data[i].html_url;
        // $(".list-group").append(listItem);
        //   if (i === 0) {
        // var dateTime = obj.dt_txt;
        //     $listItem.append(tempData);
        //     $(tempData).text();
        //     $("#current-weather").append(humData);
        //     $(humData).text();
        //     $("#current-weather").append(windSpeedData);
        //     $(windSpeedData).text();
        //     $("#current-weather").append(currentConditionsData);
        //     $(currentConditionsData).text();
        //     $weatherIcon.attr('src',imgSrc);
        //   }
        // }

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
      }
    });
}
