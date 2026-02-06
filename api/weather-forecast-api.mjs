import { apiKey } from "./config.mjs";
        const now = new Date();
        function isSameDay(date1,date2) {
                return (
                    date1.getDate() === date2.getDate() && 
                    date1.getMonth() === date2.getMonth()&&
                    date1.getFullYear() === date2.getFullYear()
                )
            }

        export function weatherForecastToday(list) {
            return list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                // console.log(itemDate);
                return isSameDay(itemDate,now);
            })

        }

        function weatherForecastDaily(list) {
            const dailyMap = {};
            list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const key = date.toDateString();
                if (!dailyMap[key]) {
                    dailyMap[key] = [];
                }
                dailyMap[key].push(item)
            });
            return Object.values(dailyMap).filter((dayItems) => {
                const date = new Date(dayItems[0].dt * 1000);
                return !isSameDay(date,now)
            })
            .slice(0,8)
            .map(dayItems => dayItems[Math.floor(dayItems.length / 2)])
        }

        export async function fetchForecastWeather(city) {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=id&appid=${apiKey}`;
            const fetching = await fetch(url);
            const data = await fetching.json();
            if (!fetching.ok) {
                return {
                    ok:false,
                    error:{
                        city:city,
                        status:fetching.status,
                        message:data.message
                    }
                }
            }

            const forecastToday = weatherForecastToday(data.list);
            const forecastDaily = weatherForecastDaily(data.list)
            // console.log(forecast);
            return {
                ok:true,
                status:fetching.status,
                city:data.city,
                todayForecast:forecastToday,
                dailyForecast:forecastDaily,
                metadata:{
                    fetchedAt:Date.now(),
                    source:"OpenWeather"
                }
            }
            
        }

        const options = {
            weekday: 'long', // 'short' untuk singkatan
            year: 'numeric',
            month: 'long',   // 'short' untuk singkatan
            day: 'numeric',
            hour:`2-digit`,
            minute:`2-digit`
        }
        
        const options2 = {
            weekday: 'long', // 'short' untuk singkatan
            year: 'numeric',
            month: 'long',   // 'short' untuk singkatan
            day: 'numeric',
        }

        export function parseTodayForecast(result) {
                return result.todayForecast.map(item => {
                    return {
                            city:result.city.name,
                            weather:{
                                main:item.weather[0].main,
                                descWeather:item.weather[0].description,
                            },
                            temp:{
                                temp:item.main.temp,
                                minTemp:item.main.temp_min,
                                maxTemp:item.main.temp_max,
                            },
                            wind:{
                                windSpeed:item.wind.speed,
                                windDeg:item.wind.deg,
                                windGust:item.wind.gust
                            },
                            sea:{
                                seaLevel:item.sea_level,
                            },
                            dt:new Date(item.dt * 1000).toLocaleDateString(`id-ID`,options)
                    }
                })
        }


        export function parseDailyForecast(result) {
            return result.dailyForecast.map (item => {
                return {
                        city:result.city.name,
                        weather:{
                            main:item.weather[0].main,
                            descWeather:item.weather[0].description,
                        },
                        temp:{
                            temp:item.main.temp,
                            minTemp:item.main.temp_min,
                            maxTemp:item.main.temp_max,
                        },
                        wind:{
                            windSpeed:item.wind.speed,
                            windDeg:item.wind.deg,
                            windGust:item.wind.gust
                        },
                        sea:{
                            seaLevel:item.sea_level,
                        },
                        dt:new Date(item.dt * 1000).toLocaleDateString('id-ID',options2)
                }
            }) 
        }