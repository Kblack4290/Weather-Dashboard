
$(document).ready(function () {

    $("#search-button").click(function () {


        var city = $("#city-name").val();
        var currentDate = moment().format('MMMM Do YYYY');




        if (city != "") {
            $.ajax({
                dataType: "json",
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial",
                type: "GET",
                success: function (data) {
                    console.log(data);
                    var iconCode = data.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                    $("#city-title").append(data.name + " " + currentDate);
                    $("img").attr('src', iconUrl);
                    $("#temp").append(data.main.temp + " F");
                    $("#humidity").append(data.main.humidity + " %");
                    $("#windSpeed").append(data.wind.speed + " MPH");

                    // window.localStorage.setItem(city, searchHistory); Local Storage
                },


            });
            $.ajax({

                dataType: "json",
                url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=7&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial",
                type: "GET",
                cnt: "5",

                success: function fiveDay(data) {
                    console.log(data);
                    var weatherForecast = "";

                    weatherForecast += "<h2>" + data.city.name + "</h2>";

                    $.each(data.list, function (index, val) {
                        weatherForecast += "<p>" // Opening paragraph tag
                        weatherForecast += "<b>Day " + index + "</b>: " // Day
                        weatherForecast += val.main.temp + "&degF" // Temperature
                        weatherForecast += "<span> | " + val.weather[0].description + "</span>"; // Description
                        weatherForecast+= "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                        weatherForecast += "</p>" // Closing paragraph tag
                    }); 
                    $(".forecast").html(weatherForecast);


                    // for (var i = 1; i <= 5; i++) {

                    //     var day = data.list[i];
                    //     console.log([i]);

                    //     var cardBody;
                    //     var nextDay = new moment().add(i,'day');

                    //     $(cardBody).append(nextDay.format('MMMM Do YYYY'));


                    // }

                }

            });

            // var lat = data.coord.lat;
            // var long = data.coord.lon;
            // var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial"
            // $.ajax({

            //     dataType: "json",
            //     type: "GET",
            //     url: uvIndex,

            //     success: function uvIndex(data) {



            //         console.log(data);
            //     }


            // })

        } else {
            $("error").html("Please enter a City")
        }





    }); 

});


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

// var weatherData;
// var fetchButton = document.getElementById('search-button')
// var input;
// var searchHistory = JSON.parse(window.localStorage.getItem('Search History'))

// function weatherAPI() {

//     var city = document.getElementById("city-name").value;
//     var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?q='
//     var apiKey = '&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial'
//     var requestData = weatherApi + city + apiKey;
//     var cityHistory = document.querySelector("city-name")

//     fetch(requestData)
//         .then(function (response) {
//             return response.json();
//          }) //console.log(requestData)

//         .then(function(data){

//             console.log(data);
//             for(var i=0; i<data; i++){
//                 var cityTitle= document.createElement('h3');
//                 var date = document.getElementById('date')
//                 var todaysWeather = document.getElementById('todays-weather')

//                 cityTitle.textContent = data[i].city;
//                 console.log(name);
//                 todaysWeather.append(cityTitle);

//             }
//         })



// }





// fetchButton.addEventListener('click', weatherAPI)