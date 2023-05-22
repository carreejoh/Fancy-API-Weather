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

    $('#forecast1').children('img').eq(0).attr("src", "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png");
    $('#forecast2').children('img').eq(0).attr("src", "https://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + "@2x.png");
    $('#forecast3').children('img').eq(0).attr("src", "https://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + "@2x.png");
    $('#forecast4').children('img').eq(0).attr("src", "https://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + "@2x.png");
    $('#forecast5').children('img').eq(0).attr("src", "https://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + "@2x.png");

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
};



function appendCurrentWeather(data) {
    console.log(data);

    var epoch = data.dt;
    var date = new Date(epoch * 1000);
    console.log(date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate());
    var realMonth = date.getMonth() + 1;


    function tempConversion(temp) {
        return Math.floor(9/5 * (temp-273) + 32);
    }

    $('#currentDate').text(date.getFullYear() + "-" + realMonth + "-" + date.getDate());
    $('#currentTemp').text("Temperature: " + tempConversion(data.main.temp));
    $('#currentWind').text("Wind: " + data.wind.speed + "mph");
    $('#currentHumdity').text("Humidity: " + data.main.humidity + "%");
    $('#currentForecast').attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
}





function findWeather(tempLat, tempLon) {
    
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + tempLat + '&lon=' + tempLon + '&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        appendDataFuture(data);
    })
};

function findWeatherCurrent(tempLat, tempLon) {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + tempLat + '&lon=' + tempLon + '&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        appendCurrentWeather(data);
    })
}



function loadLocalCities(tempCity) {
    let loadCitiesJSON = (JSON.parse(localStorage.getItem('recentCities')));
    
    if(loadCitiesJSON === null) {

    } else if(loadCitiesJSON.includes(tempCity)) {

    } else {
        let recentCityLinkDiv = document.createElement('div');
        let recentCityLink = document.createElement('a');
        recentCityLink.append(tempCity.replace(/_/g," "));
        recentCityLinkDiv.append(recentCityLink);
        recentCityLink.classList.add("newCityLink");
        $('#recentCityList').append(recentCityLinkDiv);
    }

    let loadCities = (localStorage.getItem('recentCities'));
    if (loadCities === null) {
        localStorage.setItem('recentCities', '["salt_lake_city"]');
    } else if(loadCities.includes(tempCity)) {
        
    } else {
        let addACity = JSON.parse(localStorage.getItem('recentCities'));
        addACity.push(tempCity);
        localStorage.setItem('recentCities', JSON.stringify(addACity));
    };

}

function onLoadCities() {
    let loadCities = (JSON.parse(localStorage.getItem('recentCities')));
    console.log((loadCities));
    for(i = 0; i < 100; i++) {
        if(loadCities[i] === undefined) {

        } else {
            let recentCityLinkDiv = document.createElement('div');
            let recentCityLink = document.createElement('a');
            recentCityLink.append(loadCities[i].replace(/_/g," "));
            recentCityLinkDiv.append(recentCityLink);
            recentCityLink.classList.add("newCityLink");
            $('#recentCityList').append(recentCityLinkDiv);
        }
    }
}

function findCoords() {
    let tempCity = searchedCity.value;
    tempCity=tempCity.replace(/ /g,"_");

    loadLocalCities(tempCity);
    fetchCoords(tempCity);
};

function fetchCoords(tempCity) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + tempCity + '&limit=&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        console.log(data[0]);
        if(data[0].country === "US") {
            let tempLat = data[0].lat;
            let tempLon = data[0].lon;
            findWeather(tempLat, tempLon);
            findWeatherCurrent(tempLat, tempLon);
        } else {
            alert("Sorry this city is not in the USA");
        }
    })};

citySearch.addEventListener('click', findCoords);

window.addEventListener('load', findWeather(40.7596198, -111.8867975), findWeatherCurrent(40.7596198, -111.8867975), loadLocalCities("salt_lake_city"), onLoadCities());

$('#recentCityList').click(function(event) {
    let chosenLink = event.target;
    console.log(chosenLink.textContent);
    fetchCoords(chosenLink.textContent);
})