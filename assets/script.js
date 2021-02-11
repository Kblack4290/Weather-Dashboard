
$(document).ready(function () {

    $("#search-button").click(function () {

        $("#city-title").empty();
        $("#temp").empty();
        $("#humidity").empty();
        $("#windSpeed").empty();
        $("#uv-index").empty();
        $("#forecast").empty();

        var city = $("#city-name").val();
        var currentDate = moment().format('MMMM Do YYYY');

        var lat = ""
        var long = ""


        if (city != "") {
            $.ajax({
                dataType: "json",
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial",
                type: "GET",
                success: function (data) {
                    console.log(data);
                    var iconCode = data.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                    lat = data.coord.lat;
                    long = data.coord.lon;
                    $("#city-title").append(data.name + " " + currentDate);
                    $("img").attr('src', iconUrl);
                    $("#temp").append("Temperature: " + data.main.temp + " F");
                    $("#humidity").append("Humidity: " + data.main.humidity + " %");
                    $("#windSpeed").append("Wind: " + data.wind.speed + " MPH");

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
                        var fiveDaysForward = new moment().add(index, 'day');
                        var columnDiv = $("<div>").addClass("col-2 ")
                        var weatherCard = $("<div>").addClass("card-body bg-primary text-white ml-3 mb-3 rounded")
                        var h5 = $("<h5>")
                        var p = $("<p>")
                        var div =$("<div>")
                        var temp = val.main.temp + " F" // Temperature
                        var humid = val.main.humidity + " %"
                        var description = "<span> | " + val.weather[0].description + "</span>"; // Description
                        var icon = $("<img>")
                        h5.addClass("card-title")
                        h5.text(fiveDaysForward.format('dddd MMMM DD'))
                        p.addClass("card-text")
                        div.addClass("humid")
                        icon.attr("src", "https://openweathermap.org/img/w/" + val.weather[0].icon + ".png")
                        // var icon = "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                        p.text("Temp: " + temp, description)
                        div.text("Hum: " + humid, description)
                        weatherCard.append(h5, icon, p, div)
                        columnDiv.append(weatherCard)
                        // $("#forecast").addClass("col forecast bg-primary text-white ml-3 mb-3 rounded")
                        $("#forecast").append(columnDiv);
                    });
                }

            });


        } else {
            $("error").html("Please enter a City")
        }


        var previousCity = $("<li class='list-group-item old-city'>").text(city);
        $("#results").prepend(previousCity)
        window.localStorage.setItem("city", city);

        previousCity.on("click", function (event) {

            $("#city-title").empty();
            $("#temp").empty();
            $("#humidity").empty();
            $("#windSpeed").empty();
            $("#uv-index").empty();
            $("#forecast").empty();

            var oldCity = event.target.textContent;
            localStorage.setItem("city", oldCity);

            $.ajax({
                dataType: "json",
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4f648b539e1052f39292ff275c2bc4c2&units=imperial",
                type: "GET",
                success: function (data) {
                    console.log(data);
                    var iconCode = data.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                    lat = data.coord.lat;
                    long = data.coord.lon;
                    $("#city-title").append(data.name + " " + currentDate);
                    $("img").attr('src', iconUrl);
                    $("#temp").append("Temperature: " + data.main.temp + " F");
                    $("#humidity").append("Humidity: " + data.main.humidity + " %");
                    $("#windSpeed").append("Wind: " + data.wind.speed + " MPH");
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
                        var fiveDaysForward = new moment().add(index, 'day');
                        var columnDiv = $("<div>").addClass("col-2 ")
                        var weatherCard = $("<div>").addClass("card-body bg-primary text-white ml-3 mb-3 rounded")
                        var h5 = $("<h5>")
                        var p = $("<p>")
                        var div =$("<div>")
                        var temp = val.main.temp + " F" // Temperature
                        var humid = val.main.humidity + " %"
                        var description = "<span> | " + val.weather[0].description + "</span>"; // Description
                        var icon = $("<img>")
                        h5.addClass("card-title")
                        h5.text(fiveDaysForward.format('dddd MMMM DD'))
                        p.addClass("card-text")
                        div.addClass("humid")
                        icon.attr("src", "https://openweathermap.org/img/w/" + val.weather[0].icon + ".png")
                        // var icon = "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                        p.text("Temp: " + temp, description)
                        div.text("Hum: " + humid, description)
                        weatherCard.append(h5, icon, p, div)
                        columnDiv.append(weatherCard)
                        // $("#forecast").addClass("col forecast bg-primary text-white ml-3 mb-3 rounded")
                        $("#forecast").append(columnDiv);
                    });
                }

            });
        })

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