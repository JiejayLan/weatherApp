var x = document.getElementById("weatherDetails");
var tempType = true;//represent C
var lat;
var long;

// basic format is taken from w3schools
// https://www.w3schools.com/html/html5_geolocation.asp

// function myMap() {
//     console.log("calling my map");
//     console.log(lat);
//     console.log(long);
//     var mapProp= {
//         center:new google.maps.LatLng(51.508742,-0.120850),
//         zoom:5,
//     };
//     var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
// }

function myMap() {
    console.log("calling my map");
    console.log(lat);
    var mapProp= {
        center:new google.maps.LatLng(lat,long),
        zoom:10,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function getLocation() {

    console.log("get location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showWeather(position) {
     lat = position.coords.latitude;
    long = position.coords.longitude;

    console.log("call show weather");
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;

    $.getJSON(url, function(data) {
        console.log(data);
        console.log(data.main.temp);

        var temp = document.getElementById("temp");
        temp.innerHTML = data.main.temp.toFixed(1) + '&degC';


        var loc = document.getElementById("location");
        loc.innerHTML = data.name + ", " + data.sys.country;

        var weather = document.getElementById("weather");
        weather.innerHTML = data.weather[0].main;
        setBackground(data.weather[0].main);
    });
    myMap();
}

function toggleUnits() {
    console.log("call toggle button");
    var temp = document.getElementById("temp");
    var tempContents = temp.innerHTML;
    var degrees = parseFloat(tempContents);

    if (tempType==true) {
        temp.innerHTML = (degrees * 9 / 5 + 32).toFixed(1) + '&degF';
    }
    else {
        temp.innerHTML = ((degrees - 32) * 5 / 9).toFixed(1) + '&degC';
    }
    tempType=!tempType;
}

// handling errors function is taken from w3schools
// https://www.w3schools.com/html/html5_geolocation.asp
function showError(error) {
    console.log("call showError");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable";
            break;
        case error.TIMOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

function setBackground(weather) {
    var html = document.getElementsByTagName('html')[0];

    switch (weather) {
        case 'Drizzle':
            html.style.backgroundImage = 'url(img/drizzle.jpg)';
            break;
        case 'Clear':
            html.style.backgroundImage = 'url(img/clear.jpg)';
            break;
        case 'Clouds':
            html.style.backgroundImage = 'url(img/clouds.jpg)';
            break;
        case 'Mist':
            html.style.backgroundImage = 'url(img/mist.jpg)';
            break;
        case 'Rain':
            html.style.backgroundImage = 'url(img/rain.jpg)';
            break;
        case 'Snow':
            html.style.backgroundImage = 'url(img/snow.jpg)';
            break;
        case 'Thunderstorm':
            html.style.backgroundImage = 'url(img/thunderstorm.jpg)';
            break;
    }
}




