import { fetchWeather, parserData } from "../api/weather-api.mjs";
import { fetchForecastWeather, parseTodayForecast, parseDailyForecast } from "../api/weather-forecast-api.mjs";

// console.log(window.location.search); akan menghasilkan nilai string dari url;

// mengubah nilai string menjadi nilai yang bisa diakses menggunaan URLSearchParams
// hasil akan menjadi seperti object
const params = new URLSearchParams(window.location.search); 

// mengambil key dari params dan mendapatkan hasil yang berupa string
const city = params.get("city");

const imgOn = document.getElementById("img-on-fly")
const tempOn = document.getElementById("temp-on");
const weatherOn = document.getElementById("weather-on");
const descOn = document.getElementById("desc-on");
const dateTimeOn = document.getElementById("date-time-on");
const windSpeedOn = document.getElementById("wind-speed");
const windDegreesOn = document.getElementById("wind-degrees");

const weatherIcon = document.getElementsByClassName("weather-icon");
const wind = document.getElementById("wind");
const speedWindDesc = document.getElementById("wind-speed-desc");
const windGustOn = document.getElementById("wind-gust");

const weatherOnClock = document.getElementById("weather-on-clock");
const wrapperOnHours = document.getElementById("wrapper-on-hours");
const hoursWeather = document.getElementById("forecast-today");
const dailyWeather = document.getElementById("forecast-daily");
const forecastToday1 = document.getElementById("forecast-today-1");
const dataForecastToday1 = document.getElementById("data-forecast-today-1");
const today1 = document.getElementById("today-1");
const section3 = document.getElementById("data-forecast-3");
const temp1 = document.getElementById("temp-1");
const imgToday1 = document.getElementById("img-1");
const desc1 = document.getElementById("desc-1");
const time1 = document.getElementById("date-time-1");

// daily manipulation
const imgDaily1 = document.getElementById("img-daily-1");
const imgDaily2 = document.getElementById("img-daily-2");
const imgDaily3 = document.getElementById("img-daily-3");
const imgDaily4 = document.getElementById("img-daily-4");
const imgDaily5 = document.getElementById("img-daily-5");
const tempDaily1 = document.getElementById("temp-daily-1");
const tempDaily2 = document.getElementById("temp-daily-2");
const tempDaily3 = document.getElementById("temp-daily-3");
const tempDaily4 = document.getElementById("temp-daily-4");
const tempDaily5 = document.getElementById("temp-daily-5");
const weatherDaily1 = document.getElementById("weather-daily-1");
const weatherDaily2 = document.getElementById("weather-daily-2");
const weatherDaily3 = document.getElementById("weather-daily-3");
const weatherDaily4 = document.getElementById("weather-daily-4");
const weatherDaily5 = document.getElementById("weather-daily-5");
const descDaily1 = document.getElementById("desc-daily-1");
const descDaily2 = document.getElementById("desc-daily-2");
const descDaily3 = document.getElementById("desc-daily-3");
const descDaily4 = document.getElementById("desc-daily-4");
const descDaily5 = document.getElementById("desc-daily-5");
const dateDaily1 = document.getElementById("date-daily-1");
const dateDaily2 = document.getElementById("date-daily-2");
const dateDaily3 = document.getElementById("date-daily-3");
const dateDaily4 = document.getElementById("date-daily-4");
const dateDaily5 = document.getElementById("date-daily-5");

// city config
const cityOn = document.getElementById("city-on");
const cityHours1 = document.getElementById("city-hours-1");
const cityDaily1 = document.getElementById("city-daily-1");
const cityDaily2 = document.getElementById("city-daily-2");
const cityDaily3 = document.getElementById("city-daily-3");
const cityDaily4 = document.getElementById("city-daily-4");
const cityDaily5 = document.getElementById("city-daily-5");

const dateTime = new Date();



const date = dateTime.toLocaleDateString('id-ID', {
    weekday: 'long', // 'short' untuk singkatan
    year: 'numeric',
    month: 'long',   // 'short' untuk singkatan
    day: 'numeric',
    hour:`2-digit`,
    minute:`2-digit`
});



const weatherIconMap = {
    Thunderstorm:"storm.webp",
    Clear:"sun.webp",
    Clouds:"cloudy.webp",
    Rain:"heavy-rain.webp",
    Snow:"snow.webp",
}

const descWeather = {
    Thunderstorm:"A thunderstorm is a severe weather condition characterized by the presence of lightning and its acoustic effect, thunder",
    Clear:"a state where the sky has no clouds or only a minimal amount (typically less than 10% coverage)",
    Clouds:"Clouds are visible collections of tiny water droplets or ice crystals suspended in the atmosphere",
    Rain:"Rain is a form of precipitation consisting of liquid water droplets that fall from clouds to the Earth's surface",
    Snow:"Snow is precipitation in the form of soft, crystalline ice flakes"
}

async function initWeatherApp() {
    const raw = await fetchWeather(city);
    const forecast = await fetchForecastWeather(city);
    const todayForecast = parseTodayForecast(forecast);
    const dailyForecast = parseDailyForecast(forecast);
    const parsed = parserData(raw);
    if (!parsed.ok) {
        const error = parsed.message
    }
    if (!forecast.ok) {
        const error = forecastmessage;
    }
    renderWeather(parsed);
    renderForecastWeather(todayForecast,dailyForecast)
}

function renderWeather(data) {
    const weather = data.mainWeather.weather;
    const iconSrc = weatherIconMap[weather] ?? "No";
    imgOn.src = `src/${iconSrc}`;
    tempOn.textContent = `${data.temp.average}°C / ${data.temp.min}°C`
    weatherOn.textContent = weather;
    const descContentOn = descWeather[weather] ?? "No";
    descOn.textContent = descContentOn;
    dateTimeOn.textContent = date;
    const speed = data.wind.speed;
    let descSpeedData;
    windSpeedOn.textContent = `Wind Speed : ${speed} m/s `;
    if (data.wind.gust === undefined) windGustOn.textContent = "Wind Gust : No data";
    else {
        windGustOn.textContent = `Wind Gust : ${data.wind.gust}`
    }
    windDegreesOn.textContent = `Wind Degrees : ${data.wind.degrees}°`;
    cityOn.textContent = `- ${data.mainWeather.city} -`;
        if (speed < 0.3) {descSpeedData = "Calm";}
        else if (speed >= 0.3 && speed <= 1.5) {descSpeedData = "Light Air";} 
        else if (speed > 1.5 && speed <= 3.3) {descSpeedData = "Light Breeze";}
        else if (speed > 3.3 && speed <= 5.4) {descSpeedData = "Gentle Breeze";} 
        else if (speed > 5.4 && speed <= 7.9) {descSpeedData = "Moderate Breeze";}
        else if (speed > 7.9 && speed <= 10.7) {descSpeedData = "Fresh Breeze";}
        else if (speed > 10.7 && speed <= 13.8) {descSpeedData = "Strong Breeze";}
        else if (speed > 13.8 && speed <= 17.1) {descSpeedData = "Near Gale";}
        else if (speed > 17.1 && speed <= 20.7) {descSpeedData = "Gale";}
        else if (speed > 20.7 && speed <= 24.4) {descSpeedData = "Strong Gale";}
        else if (speed > 24.4 && speed <= 28.4) {descSpeedData = "Storm";}
        else if (speed > 28.4 && speed <= 32.6) {descSpeedData = "Violent Storm";}
        else if (speed > 32.6) {descSpeedData = "Hurricane";}
    
    speedWindDesc.textContent = `"${descSpeedData}"`;
    
}


function renderForecastWeather(todayForecast,dailyForecast) {
    if (todayForecast[0]) {
        const cityHours = todayForecast[0].city;
        const iconSrc1 = weatherIconMap[todayForecast[0].weather.main] ?? "No";
        imgToday1.src = `src/${iconSrc1}`;
        temp1.textContent = `${todayForecast[0].temp.temp}°C / ${todayForecast[0].temp.minTemp}°C`;
        today1.textContent = todayForecast[0].weather.main;
        const descContent1 = descWeather[todayForecast[0].weather.main] ?? "No";
        desc1.textContent = descContent1;
        time1.textContent = `${todayForecast[0].dt}`
        cityHours1.textContent = `- ${cityHours} -`
    }
    if (todayForecast[1]) {
        const cityHours = todayForecast[0].city;
        const hours2 = document.createElement("div");
        hours2.className = "p-6 mb-6 bg-linear-to-b min-w-xl max-w-3xl border-2 border-blue-500 rounded-2xl text-center shadow-md shadow-gray-500 font-[Quicksand] font-semibold text-xl";
        hoursWeather.appendChild(hours2);
        const dataForecastToday2 = document.createElement("div");
        dataForecastToday2.className = "w-full max-w-2xl";
        dataForecastToday2.id = "forecast-today-2";
        hours2.appendChild(dataForecastToday2);
        const weather2 = document.createElement("div");
        weather2.className = "flex flex-col gap-2 items-center flex-wrap w-full max-w-2xl";
        dataForecastToday2.appendChild(weather2);
        const iconSrc2 = weatherIconMap[todayForecast[1].weather.main] ?? "No";
        const imgToday2 = document.createElement("img");
        imgToday2.id = "img-2";
        imgToday2.className = "w-20 h-20 drop-shadow-2xl";
        imgToday2.src = `src/${iconSrc2}`;
        const temp2 = document.createElement("p");
        temp2.className = "text-lg sm:text-xl";
        temp2.id = "temp-2";
        temp2.textContent = `${todayForecast[1].temp.temp}°C / ${todayForecast[1].temp.minTemp}°C`;
        const today2 = document.createElement("p");
        today2.id = "today-2";
        today2.className = "text-2xl sm:text-4xl";
        today2.textContent = `${todayForecast[1].weather.main}`;
        const desc2 = document.createElement("p");
        const descContent2 = descWeather[todayForecast[1].weather.main] ?? "No";
        desc2.className = "text-sm";
        desc2.textContent = descContent2;
        const time2 = document.createElement("p");
        time2.className = "text-lg";
        time2.textContent = `${todayForecast[1].dt}`;
        const cityHours2 = document.createElement("p")
        cityHours2.id = "city-hours-2";
        cityHours2.className = "text-lg font-bold";
        cityHours2.textContent = `- ${cityHours} -`
        weather2.appendChild(imgToday2);
        weather2.appendChild(temp2);
        weather2.appendChild(today2);
        weather2.appendChild(desc2);
        weather2.appendChild(time2);
        weather2.appendChild(cityHours2);
        
    }
    if (todayForecast[2]) {
        const cityHours = todayForecast[0].city;
        const hours3 = document.createElement("div");
        hours3.className = "p-6 mb-6 bg-linear-to-b min-w-xl max-w-3xl border-2 border-blue-500 rounded-2xl text-center shadow-md shadow-gray-500 font-[Quicksand] font-semibold text-xl";
        hoursWeather.appendChild(hours3);
        const dataForecastToday3 = document.createElement("div");
        dataForecastToday3.id = "data-forecast-today-3";
        dataForecastToday3.className = "w-full max-w-2xl"        
        hours3.appendChild(dataForecastToday3);
        const weather3 = document.createElement("div");
        weather3.className = "flex flex-col gap-2 items-center flex-wrap w-full max-w-2xl";
        dataForecastToday3.appendChild(weather3);
        const imgToday3 = document.createElement("img");
        const iconSrc3 = weatherIconMap[todayForecast[2].weather.main] ?? "No";
        imgToday3.src = `src/${iconSrc3}`;
        imgToday3.className = "w-20 h-20 drop-shadow-2xl"
        const temp3 = document.createElement("p");
        temp3.className = "text-lg sm:text-xl";
        temp3.textContent = `${todayForecast[2].temp.temp}°C / ${todayForecast[2].temp.minTemp}°C`;
        const today3 = document.createElement("p");
        today3.className = "text-2xl sm:text-4xl";
        today3.textContent = todayForecast[2].weather.main;
        const desc3 = document.createElement("p");
        desc3.className = "text-sm";
        const descContent3 = descWeather[todayForecast[2].weather.main] ?? "No";
        desc3.textContent = descContent3;
        const time3 = document.createElement("p");
        time3.className = "text-lg"
        time3.textContent = `${todayForecast[2].dt}`
        const cityHours3 = document.createElement("p")
        cityHours3.id = "city-hours-3";
        cityHours3.className = "text-lg font-bold";
        cityHours3.textContent = `- ${cityHours} -`
        dataForecastToday3.appendChild(imgToday3)
        dataForecastToday3.appendChild(temp3);
        dataForecastToday3.appendChild(today3);
        dataForecastToday3.appendChild(desc3);
        dataForecastToday3.appendChild(time3);
        dataForecastToday3.appendChild(cityHours3);
    }

    if (todayForecast[3]) {
        const cityHours = todayForecast[0].city;
        const hours4 = document.createElement("div");
        hours4.className = "p-6 mb-6 bg-linear-to-b min-w-xl max-w-3xl border-2 border-blue-500 rounded-2xl text-center shadow-md shadow-gray-500 font-[Quicksand] font-semibold text-xl";
        hoursWeather.appendChild(hours4);
        const dataForecastToday4 = document.createElement("div");
        dataForecastToday4.className = "w-full max-w-2xl"
        hours4.appendChild(dataForecastToday4);
        const newDiv = document.createElement("div");
        newDiv.id = "weather-4";
        newDiv.className = "flex flex-col gap-2 items-center flex-wrap w-full max-w-2xl";
        const today4 = document.createElement("p");
        const temp4 = document.createElement("p")
        const imgToday4 = document.createElement("img");
        const desc4 = document.createElement("p");
        const time4 = document.createElement("p");
        const iconSrc4 = weatherIconMap[todayForecast[3].weather.main] ?? "No";
        imgToday4.src = `src/${iconSrc4}`;
        imgToday4.className = "w-20 h-20 drop-shadow-2xl"
        temp4.className = "text-lg sm:text-xl"
        temp4.textContent = `${todayForecast[3].temp.temp}°C / ${todayForecast[3].temp.minTemp}°C`;
        today4.textContent = todayForecast[3].weather.main;
        today4.className = "text-2xl sm:text-4xl"
        const descContent4 = descWeather[todayForecast[3].weather.main] ?? "No";
        desc4.textContent = descContent4;
        desc4.className = "text-sm"
        time4.textContent = `${todayForecast[3].dt}`
        const cityHours4 = document.createElement("p")
        cityHours4.id = "city-hours-4";
        cityHours4.className = "text-lg font-bold";
        cityHours4.textContent = `- ${cityHours} -`
        dataForecastToday4.appendChild(newDiv);
        newDiv.appendChild(imgToday4);
        newDiv.appendChild(temp4);
        newDiv.appendChild(today4);
        newDiv.appendChild(desc4);
        newDiv.appendChild(time4);
        newDiv.appendChild(cityHours4);
    }

    if (!todayForecast[0] && !todayForecast[1] && !todayForecast[2] && !todayForecast[3]) {
        const resetSection = document.createElement("div");
        resetSection.id = "reset-section";
        resetSection.className = "mx-auto w-sm sm:w-lg p-6 mb-6 bg-linear-to-b border-2 border-blue-500 rounded-2xl text-center shadow-md shadow-gray-500 font-[Quicksand] font-semibold";
        wrapperOnHours.appendChild(resetSection);
        const resetData = document.createElement("div");
        resetData.id = "reset-data";
        resetData.className = "w-full max-w-2xl";
        resetSection.appendChild(resetData)
        const plainContent = document.createElement("div");
        plainContent.id = "plain-content";
        plainContent.className = "w-full max-w-2xl";
        resetData.appendChild(plainContent);
        const resetMessage = document.createElement("p");
        resetMessage.id = "reset-message";
        resetMessage.className = "text-lg sm:text-xl";
        resetMessage.textContent = "Data is being reset. Please wait a moment."
        plainContent.appendChild(resetMessage);
        dataForecastToday1.remove();
    };

    const iconDaily1 = weatherIconMap[dailyForecast[0].weather.main] ?? "No";
    const iconDaily2 = weatherIconMap[dailyForecast[1].weather.main] ?? "No";
    const iconDaily3 = weatherIconMap[dailyForecast[2].weather.main] ?? "No";
    const iconDaily4 = weatherIconMap[dailyForecast[3].weather.main] ?? "No";
    const iconDaily5 = weatherIconMap[dailyForecast[4].weather.main] ?? "No";
    imgDaily1.src = `src/${iconDaily1}`;
    imgDaily2.src = `src/${iconDaily2}`;
    imgDaily3.src = `src/${iconDaily3}`;
    imgDaily4.src = `src/${iconDaily4}`;
    imgDaily5.src = `src/${iconDaily5}`;
    tempDaily1.textContent = `${dailyForecast[0].temp.temp}°C / ${dailyForecast[0].temp.minTemp}`;
    tempDaily2.textContent = `${dailyForecast[1].temp.temp}°C / ${dailyForecast[1].temp.minTemp}`;
    tempDaily3.textContent = `${dailyForecast[2].temp.temp}°C / ${dailyForecast[2].temp.minTemp}`;
    tempDaily4.textContent = `${dailyForecast[3].temp.temp}°C / ${dailyForecast[3].temp.minTemp}`;
    tempDaily5.textContent = `${dailyForecast[4].temp.temp}°C / ${dailyForecast[4].temp.minTemp}`;
    weatherDaily1.textContent = `${dailyForecast[0].weather.main}`;
    weatherDaily2.textContent = `${dailyForecast[1].weather.main}`;
    weatherDaily3.textContent = `${dailyForecast[2].weather.main}`;
    weatherDaily4.textContent = `${dailyForecast[3].weather.main}`;
    weatherDaily5.textContent = `${dailyForecast[4].weather.main}`;
    const descDailyContent1 = descWeather[dailyForecast[0].weather.main] ?? "No";
    const descDailyContent2 = descWeather[dailyForecast[1].weather.main] ?? "No";
    const descDailyContent3 = descWeather[dailyForecast[2].weather.main] ?? "No";
    const descDailyContent4 = descWeather[dailyForecast[3].weather.main] ?? "No";
    const descDailyContent5 = descWeather[dailyForecast[4].weather.main] ?? "No";
    descDaily1.textContent = descDailyContent1;
    descDaily2.textContent = descDailyContent2;
    descDaily3.textContent = descDailyContent3;
    descDaily4.textContent = descDailyContent4;
    descDaily5.textContent = descDailyContent5;
    dateDaily1.textContent = `${dailyForecast[0].dt}`;
    dateDaily2.textContent = `${dailyForecast[1].dt}`;
    dateDaily3.textContent = `${dailyForecast[2].dt}`;
    dateDaily4.textContent = `${dailyForecast[3].dt}`;
    dateDaily5.textContent = `${dailyForecast[4].dt}`;
    const cityDaily = dailyForecast[0].city;
    cityDaily1.textContent = `- ${cityDaily} -`;
    cityDaily2.textContent = `- ${cityDaily} -`;
    cityDaily3.textContent = `- ${cityDaily} -`;
    cityDaily4.textContent = `- ${cityDaily} -`;
    cityDaily5.textContent = `- ${cityDaily} -`;
}

const dailyLink = document.getElementById("daily-link");
const todayLink = document.getElementById("today-link");
const hoursLink = document.getElementById("hours-link");
dailyLink.addEventListener("click", (e) => {
    wrapperOnHours.classList.add("hidden");
    weatherOnClock.classList.add("hidden");
    dailyWeather.classList.remove("hidden");
})
todayLink.addEventListener("click",(e) => {
    wrapperOnHours.classList.add("hidden");
    weatherOnClock.classList.remove("hidden");
    dailyWeather.classList.add("hidden");
})
hoursLink.addEventListener("click",(e) => {
    wrapperOnHours.classList.remove("hidden");
    weatherOnClock.classList.add("hidden");
    dailyWeather.classList.add("hidden")
})


initWeatherApp();
