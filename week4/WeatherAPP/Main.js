var api_key="8b4f5bb6be9ffe44e26e027f206bf6d8";

var cityInput = document.getElementById("cityInput");
var btn = document.getElementById("btn");
var container = document.getElementById("weather-info");

btn.addEventListener("click",function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("Get",`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${api_key}`);
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${api_key}`);
    ourRequest.onload = function() {
        if (ourRequest.status == 200){
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);;
        }
        else if (ourRequest.status == 404){
            alert("Error 404 Page not found \n Input valid city")
        }
        else if (ourRequest.status == 401){
            alert("Error 401 Unauthorised \n Api Key has an issue")
        }


    };

    ourRequest.send()
});

function renderHTML(ourData){
    var weather = ourData.weather[0].description;
    var temp = Math.round(ourData.main.temp - 273.15);
    var wind = (ourData.wind.speed);

    var htmlString ="";

    htmlString+= "<div> <p> The weather in "+cityInput.value+ " is "+weather+"</p>"+
    "<p> The Temperature is "+temp+"°C with a wind speed of "+wind+"m/s </p>"+
    "<p> _____________________________________________________________</p> </div>";

    container.insertAdjacentHTML('afterend' , htmlString);
}