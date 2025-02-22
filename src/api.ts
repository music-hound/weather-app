// import 

const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5/"

export function getURL( request_type: string, cityName: string ){
    return `${baseURL}${request_type}?q=${cityName}&lang=ru&appid=${API_KEY}`
}