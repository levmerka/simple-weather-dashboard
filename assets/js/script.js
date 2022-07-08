// WHEN I view current weather conditions for that city
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = '8e20102d29e5d9929745e4fb83d08bf0';
var geoApiKey = 'dfd697bcf6cd03b3322cd98dd7c32990';
var btnEl = document.getElementById('searchBtn');
// var userSearch = document.getElementById('search-input').value;
// var userSearch = document.querySelector('input').value;
// var userSearch = 'Austin';

// var userSearch = searchBox.value;

var lat;
var lon;
// var fiveDayAPIUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`


function getLatLon() {
    event.preventDefault();
    var userSearch = document.getElementById('search-input').value;
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

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=8e20102d29e5d9929745e4fb83d08bf0')
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data, 'the other fetch');
                    // APPEND TO PAGE   
                })

        })
};

// getLatLon();



btnEl.addEventListener('click', getLatLon);
// btnEl.onclick = getLatLon();