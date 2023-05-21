let citySearch = document.querySelector('#citySearchSubmit');
let searchedCity = document.querySelector('#citySearch');



citySearch.addEventListener('click', function() {

    let tempCity = searchedCity.value;
    console.log(tempCity);

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=&appid=bd4cfacd3adbb7dbb84ff559c0b71f94')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        console.log(data[0]);
        if(data[0].country === "US") {

        }
    })
})