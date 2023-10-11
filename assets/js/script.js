function getWeatherApi(){
  var requestWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=68d7d3203990bad4482b2f1159f97356`;

  fetch(requestWeatherUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
    })
}
getWeatherApi(;)
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











