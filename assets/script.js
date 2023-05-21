let citySearch = document.querySelector('#citySearchSubmit');
let searchedCity = document.querySelector('#citySearch');





function findWeather(tempLat, tempLon) {
    
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + tempLat + '&lon=' + tempLon + '&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}




citySearch.addEventListener('click', function() {

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
})