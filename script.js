
// var weather;

// function dataSetUp() {

//     loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial',gotData);
// }

// function gotData(data){
// weather = data;
// console.log(data);

// }

// function currentWeather() {

//     if(weather){
//     document.getElementById("weather-detail").textContent(weather.main.temp,weather.main.temp);
//     }
// }




// $(document).ready(function () {

//     $("#city-name").click(function () {
//         var city = $("#city-name").val();
//         if (city != "") {
//             $.ajax({
//                 dataType: "json",
//                 url: "http://api.openweathermap.org/data/2.5/weather?q=city&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial",
//                 data: data,
//                 success: success
//             });
//         } else {
//             $("error").html("Please enter a City")
//         }

//     });

// });


// WHEN I search for a city
//The user sets the parameter by city in the API.
//when the user enters the city and clicks the city name will be saved below the search bar.

// THEN I am presented with current and future conditions for that city and that city is added to the search history
//Once the user clicks the city searched current weather conditions will show in. The data for this will be fetched from openweather map API

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```

var weatherData;
var fetchButton = document.getElementById('search-button')
var input;

function weatherAPI() {

    var city = document.getElementById("city-name").value;
    var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?q='
    var apiKey = '&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial'
    var requestData = weatherApi + city + apiKey;
    fetch(requestData)
        .then(function (response) {
            return response.json();
         }) //console.log(requestData)

        .then(function(data){

            console.log(data);

        })
}



fetchButton.addEventListener('click', weatherAPI)