let citySearch = document.querySelector('#citySearchSubmit');
let searchedCity = document.querySelector('#citySearch');




function appendDataFuture(data) {
    console.log(data);
    $('#currentWeatherName').text(data.city.name);

    $('#forecast1').children('h3').eq(0).text(data.list[4].dt_txt);
    $('#forecast2').children('h3').eq(0).text(data.list[12].dt_txt);
    $('#forecast3').children('h3').eq(0).text(data.list[20].dt_txt);
    $('#forecast4').children('h3').eq(0).text(data.list[28].dt_txt);
    $('#forecast5').children('h3').eq(0).text(data.list[36].dt_txt);

    function tempConversion(temp) {
        return Math.floor(9/5 * (temp-273) + 32);
    }

    $('#forecast1').children('h3').eq(1).text("Temp: " + tempConversion(data.list[4].main.temp));
    $('#forecast2').children('h3').eq(1).text("Temp: " + tempConversion(data.list[12].main.temp));
    $('#forecast3').children('h3').eq(1).text("Temp: " + tempConversion(data.list[20].main.temp));
    $('#forecast4').children('h3').eq(1).text("Temp: " + tempConversion(data.list[28].main.temp));
    $('#forecast5').children('h3').eq(1).text("Temp: " + tempConversion(data.list[36].main.temp));

    $('#forecast1').children('h3').eq(2).text("Wind: " + (data.list[4].wind.speed + " mph"));
    $('#forecast2').children('h3').eq(2).text("Wind: " + (data.list[12].wind.speed + " mph"));
    $('#forecast3').children('h3').eq(2).text("Wind: " + (data.list[20].wind.speed + " mph"));
    $('#forecast4').children('h3').eq(2).text("Wind: " + (data.list[28].wind.speed + " mph"));
    $('#forecast5').children('h3').eq(2).text("Wind: " + (data.list[36].wind.speed + " mph"));

    $('#forecast1').children('h3').eq(3).text("Humidity: " + (data.list[4].main.humidity) + "%");
    $('#forecast2').children('h3').eq(3).text("Humidity: " + (data.list[12].main.humidity) + "%");
    $('#forecast3').children('h3').eq(3).text("Humidity: " + (data.list[20].main.humidity) + "%");
    $('#forecast4').children('h3').eq(3).text("Humidity: " + (data.list[28].main.humidity) + "%");
    $('#forecast5').children('h3').eq(3).text("Humidity: " + (data.list[36].main.humidity) + "%");
}




function findWeather(tempLat, tempLon) {
    
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + tempLat + '&lon=' + tempLon + '&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        appendDataFuture(data);
    })
};


function findCoords() {
    let tempCity = searchedCity.value;
    tempCity=tempCity.replace(/ /g,"_");

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + tempCity + '&limit=&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        console.log(data[0]);
        if(data[0].country === "US") {
            let tempLat = data[0].lat;
            let tempLon = data[0].lon;
            findWeather(tempLat, tempLon);
        } else {
            alert("Sorry this city is not in the USA");
        }
    })
};



citySearch.addEventListener('click', findCoords);