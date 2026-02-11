import {apiKey} from "./config.mjs"
export async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const fetching = await fetch(url);
    const data = await fetching.json();
    if (!fetching.ok) {
        return {
            ok:false,
            error:{
                city:city,
                status:fetching.status,
                message:data.message,
            }
        }
    }
    return {
        ok:true,
        status:fetching.status,
        result:data,
        metadata:{
            fetchedAt:Date.now(),
            source:"OpenWeather"
        }

    }
}

const test = await fetchWeather("Jakarta");
// console.log(test);

export function parserData(result) {
    if (!result.ok) {
        return result.error
    }
    return {
        mainWeather:{
            city:result.result.name,
            weather:result.result.weather[0].main,
            desc:result.result.weather[0].description
        },
        wind:{
            speed:result.result.wind.speed,
            degrees:result.result.wind.deg,
            gust:result.result.wind.gust
        },
        temp:{
            average:result.result.main.temp,
            min:result.result.main.temp_min,
            max:result.result.main.temp_max,
        },
        sea_level:result.result.main.sea_level,
        grnd_level:result.result.main.grnd_level,
        status:result.status
    }
}

