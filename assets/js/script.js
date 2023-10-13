// function getWeatherApi(){
//   var requestWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=68d7d3203990bad4482b2f1159f97356`;

//   fetch(requestWeatherUrl)
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(data){
//       console.log(data)
//     })
// }
// getWeatherApi(;)
// var location = 'Sacramento' //CHANGE TO - queryselected for input from form

// function getLocationApi(){
//   var requestWeatherUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=68d7d3203990bad4482b2f1159f97356`;

//   fetch(requestWeatherUrl)
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(data){
//       console.log(data)
//     })
// }
// getLocationApi();




function startApi(event){
  event.preventDefault();
  var city = $("#city").val();
  var state = $("#state").val();  
  console.log(city)

  var fetchLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&limit=5&appid=68d7d3203990bad4482b2f1159f97356`;
  fetch(fetchLocationUrl)
  .then(function(resp){
    console.log(resp);
    return resp.json();
  }).then(function(data){
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    var coords = { lat, lon }
    return coords
  }).then(function(coords){
    // build next fetch api 
    //make the new fetch call
 
    var fetchForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=68d7d3203990bad4482b2f1159f97356`;
    
    fetch(fetchForecastUrl)
    .then(function(resp){
      return resp.json();
    })
    .then(function(data){
      var icon = data.list[0].weather[0].icon
      var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      //for icon li tag wraps img tag with src of iconurl
      console.log(iconURL)
      console.log(data)
      var cityName = data.city.name;
      console.log(cityName)
      //save city name to local storage and create li element under submit

      //insert city into h3 tag
      //create li elements for temp
    })
  })
}

function createLiEL(){

}



//on click button that deletes outside of form
$(".location").on("submit", startApi);





