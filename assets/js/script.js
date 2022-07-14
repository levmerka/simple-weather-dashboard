// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = '8e20102d29e5d9929745e4fb83d08bf0';
var geoApiKey = 'dfd697bcf6cd03b3322cd98dd7c32990';
var btnEl = document.getElementById('searchBtn');
var cityEl = document.querySelector('#citySearched');

var lat;
var lon;

//current day info
var todayTemp = document.querySelector('#temp');
var todayWind = document.querySelector('#wind');
var todayHumidity = document.querySelector('#humidity');
var uvIndex = document.querySelector('#uvIndex');

// 5 day forecast selectors
var tempOne = document.querySelector('#temp-1');
var windOne = document.querySelector('#wind-1');
var humidityOne = document.querySelector('#humidity-1');

var tempTwo = document.querySelector('#temp-2');
var windTwo = document.querySelector('#wind-2');
var humidityTwo = document.querySelector('#humidity-2');

var tempThree = document.querySelector('#temp-3');
var windThree = document.querySelector('#wind-3');
var humidityThree = document.querySelector('#humidity-3');

var tempFour = document.querySelector('#temp-4');
var windFour = document.querySelector('#wind-4');
var humidityFour = document.querySelector('#humidity-4');

var tempFive = document.querySelector('#temp-5');
var windFive = document.querySelector('#wind-5');
var humidityFive = document.querySelector('#humidity-5');

var cityEl = document.querySelector('#citySearched');
var todayEl = document.querySelector('#date-today');

var dayOneEl = document.querySelector('#date-1');
var dayTwoEl = document.querySelector('#date-2');
var dayThreeEl = document.querySelector('#date-3');
var dayFourEl = document.querySelector('#date-4');
var dayFiveEl = document.querySelector('#date-5');


//function to get weather data
function getLatLon() {
    event.preventDefault();
    
    var userSearch = document.getElementById('search-input').value;
    console.log(userSearch);
    cityEl.textContent = userSearch;
    
    var geoAPIurl = `http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${geoApiKey}`

    console.log(userSearch, 'is this working');
    fetch(geoAPIurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data, 'city info or something');
            // console.log("lat", data[0].lat)
            // console.log("lon", data[0].lon)
            lat = data[0].lat
            lon = data[0].lon

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=8e20102d29e5d9929745e4fb83d08bf0&units=imperial')
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data, 'the other fetch');
                    // APPEND TO PAGE   
                    //date
                    var currentDate = new Date(data.current.dt * 1000).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric"});
    console.log(currentDate);
                    todayEl.textContent = currentDate;

    //                 var dateOne = new Date(data[0].dt * 1000).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" });
    // console.log(dateOne);
    //                 dayOneEl.textContent = dateOne;

    //                 var dateTwo = new Date(data[1].current.dt * 1000).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric"});
    // console.log(dateTwo);
    //                 dayTwoEl.textContent = dateTwo;

    //                 var dateThree = new Date(data[2].current.dt * 1000).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric"});
    // console.log(dateThree);
    //                 dayThreeEl.textContent = dateThree;

    //                 var dateFour = new Date(data[3].current.dt * 1000).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric"});
    // console.log(dateFour);
    //                 dayFourEl.textContent = dateFour;

    //                 var dateFive = new Date(data[4].current.dt * 1000).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric"});
    // console.log(dateFive);
    //                 dayFiveEl.textContent = dateFive;

                    todayTemp.textContent = data.current.temp;
                    console.log('ferenheit', data.current.temp);
                    todayWind.textContent = data.current.wind_speed;
                    console.log('current wind', data.current.wind_speed);
                    todayHumidity.textContent = data.current.humidity;
                    console.log('current humidity', data.current.humidity);
                    uvIndex.textContent = data.current.uvi;
                    console.log('current uv', data.current.uvi);
                    //change color of UV display
                    if (data.current.uvi <= 2) {
                        uvIndex.classList.add('lowUV');
                    }   else if (data.current.uvi >= 3 && data.current.uvi <= 5) {
                        uvIndex.classList.add('modUV');
                    } else if (data.current.uvi >= 6 && data.current.uvi <= 7) {
                        uvIndex.classList.add('hiUV');
                    } else if (data.current.uvi >= 8 && data.current.uvi <= 10) {
                        uvIndex.classList.add('vhiUV');
                    } else {
                        uvIndex.classList.add('exUV');
                    }
                    
                    //forecast day one
                    tempOne.textContent = data.daily[0].temp.day;
                    console.log('tomorrow temp', data.daily[0].temp.day);
                    windOne.textContent = data.daily[0].wind_speed;
                    console.log('tomorrow wind', data.daily[0].wind_speed);
                    humidityOne.textContent = data.daily[0].humidity;
                    console.log('tomorrow humidity', data.daily[0].humidity);

                     //forecast day two
                     tempTwo.textContent = data.daily[1].temp.day;
                     console.log('day2 temp', data.daily[1].temp.day);
                     windTwo.textContent = data.daily[1].wind_speed;
                     console.log('day2wind', data.daily[1].wind_speed);
                     humidityTwo.textContent = data.daily[1].humidity;
                     console.log('day2 humidity', data.daily[1].humidity);

                    //forecast day three
                     tempThree.textContent = data.daily[2].temp.day;
                     console.log('day3 temp', data.daily[2].temp.day);
                     windThree.textContent = data.daily[2].wind_speed;
                     console.log('day3wind', data.daily[2].wind_speed);
                     humidityThree.textContent = data.daily[2].humidity;
                     console.log('day3 humidity', data.daily[2].humidity);

                    //forecast day four
                    tempFour.textContent = data.daily[3].temp.day;
                    console.log('day4 temp', data.daily[3].temp.day);
                    windFour.textContent = data.daily[3].wind_speed;
                    console.log('day4wind', data.daily[3].wind_speed);
                    humidityFour.textContent = data.daily[3].humidity;
                    console.log('day4 humidity', data.daily[3].humidity);

                    //forecast day five
                    tempFive.textContent = data.daily[4].temp.day;
                    console.log('day5 temp', data.daily[4].temp.day);
                    windFive.textContent = data.daily[4].wind_speed;
                    console.log('day5wind', data.daily[4].wind_speed);
                    humidityFive.textContent = data.daily[4].humidity;
                    console.log('day5 humidity', data.daily[4].humidity);

//daily array/loop here

                })

        })
};

// getLatLon();

// array inside loop in another variable
// var daily days
//every time loop, display temp wind humidity
//create div appendChild 


btnEl.addEventListener('click', getLatLon);
