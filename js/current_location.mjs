import { setLocalStorage } from "./utils.mjs";

const cityEl = document.getElementById("city");


export function getCurrentLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = "850f85405ab713d96880a077b3067953";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const data = await response.json();
        cityEl.innerHTML = `Your current city is: ${data.name}`;
        setLocalStorage("city", data.name);
        setLocalStorage("lat", latitude);
        setLocalStorage("lon", longitude);
        resolve(data.name);
      })
    } else {
      cityEl.innerHTML = "Geolocation is not supported by this browser."
    }
  }, error, options)
};


function error(error) {
  console.log(error);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("permission denied")
      cityEl.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      cityEl.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      cityEl.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      cityEl.innerHTML = "An unknown error occurred.";
      break;
    default:
      cityEl.innerHTML = "An unknown error occurred.";
  }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}
