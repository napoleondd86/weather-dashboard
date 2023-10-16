
var date = dayjs();
var todayDate = date.format('MMMM D, YYYY')
console.log(date.add(1, "day").format('MMMM D, YYYY'));
console.log(date.format('MMMM D, YYYY'));
var cityName = '';
let myCities = [];


// Get stored scoreboard from localStorage and print saved cities
function init() {
  myCities = JSON.parse(localStorage.getItem("cities")) || [];
  $.each(myCities, function(){
    $('#saved-cities').append($(`<li id=${this.name} class="row">
            <button data-lat="${this.lat}" data-lon="${this.lon}" class="city-name col-10">${this.name}</button>
            <button class="delete col-2">X</button>
        </li>`));
    console.log(this)
  })
}

init();

function displayForecastWx(data){
  $('#forecast-conditions').html("");
  var dayIndex = 1
  var hourIndex = 6
  console.log(icon)
  console.log(wind)
  console.log(feelsLike)
  console.log(temp)
  for( var i = 0; i < 5; i++) {
    var icon = data.list[hourIndex].weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    var temp = data.list[hourIndex].main.temp;
    var wind = data.list[hourIndex].wind;
    var feelsLike = data.list[hourIndex].main.feels_like;
    console.log("loop works")
    console.log(dayIndex)
    console.log(hourIndex)
    $('#forecast-conditions').append(`
      <li class='col'>
        <ul class='city-attributes'>
          <h3>${date.add(`${dayIndex}`, 'day').format("MMMM D")}</h3>
          <li><img src='${iconURL}' /></li>
          <li>Temperature: ${temp}deg F</li>
          <li>Winds: ${wind.speed}mph Gusting: ${wind.gust}mph</li>
          <li>Feels like: ${feelsLike}deg F</li>
        </ul>
      </li>
    `)
    hourIndex += 8
    dayIndex++;

  }
}

function fetchForecast(coords){
  var fetchForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=68d7d3203990bad4482b2f1159f97356`;
  console.log(fetchForecastUrl)
  return fetch(fetchForecastUrl)
    .then(resp => resp.json())
    .then(data => {
      displayForecastWx(data);
      console.log(data)
  })
}


function startApi(event){
  event.preventDefault();
  var city = $("#city").val();
  var state = $("#state").val();  

  var fetchLocationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&limit=5&appid=68d7d3203990bad4482b2f1159f97356`;
  fetch(fetchLocationUrl)
  .then(function(resp){
    console.log(resp);
    return resp.json();
  }).then(function(data){
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    return { lat, lon }
    //  return coords
  }).then(function(coords){
    console.log(coords)
    // build next fetch api 
    //make the new fetch call
 
    var fetchWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=68d7d3203990bad4482b2f1159f97356`;
    
    fetch(fetchWeatherUrl)
    .then(function(resp){
      return resp.json();
    })
    .then(function(data){
      // var icon = data.list[0].weather[0].icon
      // var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      // console.log(iconURL)
      //for icon li tag wraps img tag with src of iconurl
      console.log(data)
      cityName = data.name;
      console.log(cityName)
      var cityObj = {
        name: data.name,
        lat: coords.lat,
        lon: coords.lon
      };
      //displays current w
      displayCurrentWx(data);
      console.log(cityObj)
      myCities.push(cityObj);
      localStorage.setItem("cities", JSON.stringify(myCities));
      $('#saved-cities').append($(`<li id=${cityName} class="row">
            <button data-lat="${cityObj.lat}" data-lon="${cityObj.lon}" class="city-name col-10">${cityName}</button>
            <button class="delete col-2">X</button>
        </li>`));

    }).then(fetchForecast(coords))
    console.log(coords)
    
      //save city name to local storage and create li element under submit

      //insert city into h3 tag
      //create li elements for temp
   })
}



// function createCityLiEL(){
//   var cityObj = {
//     name: data.name,
//     lat: data.coord.lat,
//     lon: data.coord.lon
//   };
//   myCities.push(cityObj);
//   localStorage.setItem("cities", JSON.stringify(myCities));
//   $(`<li class="row">
//         <button class="city-name col-10">${cityName}</button>
//         <button class="delete col-2">X</button>
//     </li>`)
// }

scoreboard = JSON.parse(localStorage.getItem("users-scores")) || [];

//on click button that deletes outside of form
$(".location").on("submit", startApi);

$("#saved-cities").on("click", function(event){
  event.preventDefault();
  var clicked = event.target;
  console.log(clicked);
  var prevELText = $(clicked).prev().text();
  console.log(prevELText);
  if ($(clicked).is(".delete")) {
    var parentEl = clicked.parentNode;
    console.log("delete was clicked")
    //this removes the whole city Li element from saved cities list on the page
    parentEl.remove();
    //this removes the city from the myCities arr
    myCities = myCities.filter(city => city.name !== prevELText)
    // Update Local storage
    localStorage.setItem("cities", JSON.stringify(myCities));
  };
  if ($(clicked).is(".city-name")) {
    $("#current-conditions").html("");
    var lat = clicked.dataset.lat;
    var lon = clicked.dataset.lon;
    var clickedCoords = {lat, lon}
    //call weather api
    console.log(clickedCoords)
    var fetchWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=68d7d3203990bad4482b2f1159f97356`;
    
    fetch(fetchWeatherUrl)
    .then(function(resp){
      return resp.json();
    })
    .then(function(data){
      console.log(data)
      cityName = data.name;
      console.log(cityName)
      var cityObj = {
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon
      };
      //displays current wx
      displayCurrentWx(data);
      // displays forecast wx 
      fetchForecast(clickedCoords)

    });
  }
}); 



function displayCurrentWx(data){
  $("#current-conditions").html("");
  var icon = data.weather[0].icon;
  var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(iconURL)
  $('#current-conditions').append($(`
  <li>${data.name} ${todayDate} <img src=${iconURL} /></li>
  `))
}


