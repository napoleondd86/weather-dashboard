var date = dayjs();
console.log(date.add(1, "day").format('MMMM D, YYYY'));
console.log(date.format('MMMM D, YYYY'));
var cityName = '';
let myCities = [];

// Get stored scoreboard from localStorage and print saved cities
function init() {
  myCities = JSON.parse(localStorage.getItem("cities")) || [];
  $.each(myCities, function(){
    $('#saved-cities').append($(`<li id=${this.name} class="row">
            <button class="city-name col-10">${this.name}</button>
            <button class="delete col-2">X</button>
        </li>`));
    console.log(this)
  })
}

init();

// Returns a Promise with the latitude and longitude of the provided city and state.
function getLocation(city, state){
  var fetchLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&limit=5&appid=68d7d3203990bad4482b2f1159f97356`;
    return fetch(fetchLocationUrl)
      .then(resp => resp.json())
      .then(data => {
        var lat = data[0].lat;
        var lon = data[0].lon;
        return { lat, lon}
      });
}

// Returns a Promise with the weather data of the provided latitude and longitude.
function getWeather(coords) {
  var fetchWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=68d7d3203990bad4482b2f1159f97356`;
  return fetch(fetchWeatherUrl)
      .then(response => response.json());
}



function startApi(event){
  event.preventDefault();
  var city = $("#city").val();
  var state = $("#state").val();  
  getLocation(city, state)
    .then(coords => getWeather(coords))
    .then(data => {
      displayCurrentWx(data);
      // Other logic to update local storage, etc.
            // ...
    })
}



$(".location").on("submit", startApi);