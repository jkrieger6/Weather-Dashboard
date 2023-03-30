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
      console.log(cityData);
      var geoLatitude = cityData.lat;
      var geoLongitude = cityData.lon;
      getWeatherData(geoLatitude, geoLongitude);
    });
}


// add event listener to search history buttons
$("#searchBtn").on("click", addResult);
// $('#searchBtn').on("click", getWeather);

//add event listener to seach history items
$("search-history").on("click", function (event) {
  event.preventDefault();
  $("current-weather").attr("style", "display:inline-block");
  userInputEl.value = event.target.id;
  getResult();
});

function getWeatherData(lat, lon) {

  var $cityName = $("<h3>");
  var $temperature = $("<div>");
  var $humidity = $("<div>");
  var $windSpeed = $("<div>");
  var $weatherIcon = $("<img>");
  $weatherIcon.addClass("icon");
  var dateTime = "<div>";

  $(".forecast-five-day").empty();
  $(".city").empty();
  cityInput = $("userInput").val();

  $(".city").addClass("list-group");
  $(".city").append($cityName);
  $(".city").append(dateTime);
  $(".city").append($weatherIcon);
  $(".city").append($temperature);
  $(".city").append($windSpeed);
  $(".city").append($humidity);

var weatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&units=imperial&appid="+ APIKey;
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
                // console.log(data);
      var dateTime = data.list[0].dt_txt;
                // console.log(dateTime);
      var tempData = data.list[0].main.temp;
                // console.log("Currently " + tempData + "F");
      var humData = data.list[0].main.humidity;
                // console.log("With a humidty of " + humData + "%");
      var windSpeedData = data.list[0].wind.speed;
                // console.log("A wind speed of " + windSpeedData + "mph");
      var currentConditionsData = data.list[0].weather[0].description;
                // console.log(currentConditionsData);
      var weatherIcon = data.list[0].weather[0].icon;
                // console.log(weatherIcon);
        
    });

    // function dateTime() {
    //   var currentHour = dayjs().hour();
    //   console.log(currentHour);
    //   $("#current-weather").each(function () {
    //     var hour = parseInt($(this).attr("id"));
    //     console.log(hour);
    //     if (currentHour > hour) {
    //       $(this).addClass("past");
    //     } else if (currentHour == hour) {
    //       $(this).addClass("present");
    //     } else {
    //       $(this).addClass("future");
    //     }
        // Add code to get any user input that was saved in localStorage and set
        // the values of the corresponding textarea elements.
    //     $("userInput" + hour + " #search-history").val(localStorage.getItem(hour));
    //   });
    // }
    // dateTime();
    

//   var forecastData = data.list;
//   forecastDataforEach((item) => {
//     var date = list[4].dt_txt
//     var time = date.toLocaleTimeString();
//     var temp = item.main.temp;
//     var description = item.weather[0].description;
//   });
}
