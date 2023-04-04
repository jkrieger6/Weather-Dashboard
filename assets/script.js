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
          $listItem.append($("<ol>").text(dateTime));
          $listItem.append($("<ol>").text(" Temp: " + tempData + "F"));
          $listItem.append($("<ol>").text(" Humidity: " + humData + "%"));
          $listItem.append(
            $("<ol>").text(" Wind Speed: " + windSpeedData + "mph")
          );
          $listItem.append(
            $("<ol>").text(" Conditions: " + currentConditionsData)
          );
          $listItem.append($("<img>").attr("src", imgSrc));
          $list.append($listItem);
          
        //   var todayDate = dayjs().format("dddd, MMM DD YYYY");
        // $("#currentDay").html(todayDate);
        // $(".saveBtn").on("click", function () {
        //  var text = $(this).siblings("#userInput").val();
        // var time = $(this).parent().attr("id");
        // // Save text in local storage
        // localStorage.setItem(time, text);
        
        }
        console.log(obj);

    //     var forecastUrl =
    //     "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    //     lat +
    //     "&lon=" +
    //     lon +
    //     "&units=imperial&appid=" +
    //     APIKey;

    //     fetch(forecastUrl)
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //   var $forecastListEl = $("#forecast ol");
    //   for (let i = 1; i > data.list.length; i++)
    //   var forecastObj = data.list[i];
    //   if (forecastObj.includes("00:00:00")) {
        
    //   }
    // });
        // listItem.textContent = data[i].html_url;
        // $(".list-group").append(listItem);
        //   if (i === 0) {
        var dateTime = obj.dt_txt;
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
