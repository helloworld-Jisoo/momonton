const weather=document.querySelector(".js-weather");

const API_KEY = "1a13f288b23455f312a675a1cb3dd0d4";
const COORDS = "coords"; //Coordinates

function getWeather(lat,lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json();
    }).then(function(json){
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText=`${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude)
}

function handleGeoError(){
  console.log("can't access Geo");
}

function askeForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
  const loadedCoords=localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askeForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }
  
}

function init() {
  loadCoords();
}

init();