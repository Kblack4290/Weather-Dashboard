
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
                url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial",
                type: "GET",
                data: {
                    cnt: "5"
                },

                success: function fiveDay(data) {
                    console.log(data);
                    var weatherForecast = "";

                    weatherForecast += "<h2>" + data.city.name + "</h2>";

                    $.each(data.list, function (index, val) {
                        console.log(index);
                        var columnDiv = $("<div>").addClass("col-2 ")
                        var weatherCard = $("<div>").addClass("card-body bg-primary text-white ml-3 mb-3 rounded")
                        var h5 = $("<h5>")
                        var p = $("<p>")
                        var temp = val.main.temp + "F" // Temperature
                        var description = "<span> | " + val.weather[0].description + "</span>"; // Description
                        var icon = $("<img>")
                        h5.addClass("card-title")
                        h5.text("Day " + index)
                        p.addClass("card-text")
                        icon.attr("src", "https://openweathermap.org/img/w/" + val.weather[0].icon + ".png")
                        // var icon = "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                        p.text(temp, description)
                        weatherCard.append(h5, p, icon)
                        columnDiv.append(weatherCard)
                        // $("#forecast").addClass("col forecast bg-primary text-white ml-3 mb-3 rounded")
                        $("#forecast").append(columnDiv);
                    });



                    
                }

            });


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
// ``