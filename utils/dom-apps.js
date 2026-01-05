import { fetchWeather, parserData } from "../api/weather-api.mjs";

// console.log(window.location.search); akan menghasilkan nilai string dari url;

// mengubah nilai string menjadi nilai yang bisa diakses menggunaan URLSearchParams
// hasil akan menjadi seperti object
const params = new URLSearchParams(window.location.search); 

// mengambil key dari params dan mendapatkan hasil yang berupa string
const city = params.get("city");

const cityWeather = document.getElementById("weather");
const weatherDesc = document.getElementById("weather-desc");
const weatherIcon = document.getElementById("weather-icon");
const wind = document.getElementById("wind");
const windSpeed = document.getElementById("speed");
const windDegrees = document.getElementById("degrees");
const windGust = document.getElementById("gust");
// const temp = document.getElementById("temp-min-max");
const tempAverage = document.getElementById("temp-average");
const tempMin = document.getElementById("temp-min");
const tempMax = document.getElementById("temp-max");
const today = document.getElementById("today");
const seaLevel = document.getElementById("sea-level");
const dateTime = new Date();


const date = dateTime.toLocaleDateString('id-ID', {
    weekday: 'long', // 'short' untuk singkatan
    year: 'numeric',
    month: 'long',   // 'short' untuk singkatan
    day: 'numeric'
});

// console.log(formatLokal);


const weatherIconMap = {
    Thunderstorm:"storm.png",
    Clear:"sun.png",
    Clouds:"cloudy.png",
    Rain:"heavy-rain.png",
    Snow:"snow.png"
}

// console.log(windSpeed);


async function initWeatherApp() {
    if (city) {
        // cityWeather.textContent = "Loading ...";
        cityWeather.textContent = "Loading ...";
        weatherDesc.textContent = "Loading ...";
        seaLevel.textContent = "Loading ...";
        windSpeed.textContent = "Loading ...";
        windDegrees.textContent = "Loading ...";
        windGust.textContent = "Loading ...";
        tempAverage.textContent = "Loading ...";
        tempMin.textContent = "Loading ...";
        tempMax.textContent = "Loading ...";
        seaLevel.textContent = "Loading ...";

    }
    else if (!city) {
        today.textContent = "Kota tidak ditemukan, mohon inputkan nama kota yang valid"; 
        return;
    }
    const raw = await fetchWeather(city);
    const parsed = parserData(raw);
    if (!parsed.ok) {
        const error = parsed.message
        today.textContent = error;
        // return;
    }
    // console.log(parsed);
    renderWeather(parsed);
}

function renderWeather(data) {
    const weather = data.mainWeather.weather;
    const iconSrc = weatherIconMap[weather] ?? "No";
    weatherIcon.src = `src/${iconSrc}`;
    // weatherIcon.alt = weather;

    cityWeather.textContent = `${data.mainWeather.city}`;
    weatherDesc.textContent = `${data.mainWeather.weather}`;
    windSpeed.textContent = `Wind Speed : ${data.wind.speed}`;
    windDegrees.textContent = `Wind Degrees : ${data.wind.degrees}`;
    if (data.wind.gust === undefined) {
        windGust.textContent = `Wind Gust : Not available`
    }
    else {
        windGust.textContent = `Wind Gust : ${data.wind.gust}`;
    }
    tempAverage.textContent = `Temperature : ${data.temp.average}`;
    tempMin.textContent = `Min. Temperature : ${data.temp.min}`;
    tempMax.textContent = `Max. Temperature : ${data.temp.max}`;
    seaLevel.textContent = `Sea Level : ${data.sea_level}`;
    today.textContent = `${date}`;
}

initWeatherApp();
