import { useEffect, useState } from "react";
import { getURL } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { toggleTheme } from "../state/themeSlice";

interface Weather {
  coord: {
    lon: string;
    lat: string;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  snow?: {
    "1h": number;
  };
}

const WeatherComponent = () => {

  const isLight = useSelector((state : RootState) => state.theme.isLight);
  const dispatch = useDispatch();

  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(getURL('weather', 'batumi'));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error){
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      } finally {
        setLoading(false);
      }
    };

    fetchData()

  },[])



  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!data) return <p>Нет данных</p>;

  return (
    <div
    style={{
      maxWidth:'500px',
      wordWrap: 'break-word',
      display:'flex',
      flexDirection:'column',
    }}>
        {JSON.stringify(data)}
        {/* <div>{Object.keys(data).join('/ /')}</div> */}
        <button onClick={() => dispatch(toggleTheme())}>
          {isLight ? "Светлая тема" : "Тёмная тема"}
        </button>
        <div>
          <h2>Погода в {data.name}, {data.sys.country}</h2>
          <p><strong>Температура:</strong> {data.main.temp}K</p>
          <p><strong>Ощущается как:</strong> {data.main.feels_like}K</p>
          <p><strong>Ветер:</strong> {data.wind.speed} м/с, направление {data.wind.deg}°</p>
          <p><strong>Видимость:</strong> {data.visibility} м</p>
          <p><strong>Облачность:</strong> {data.clouds.all}%</p>
          <p><strong>Давление:</strong> {data.main.pressure} hPa</p>
          <p><strong>Влажность:</strong> {data.main.humidity}%</p>
          <p><strong>Снег за последний час:</strong> {data.snow?.["1h"] || 0} мм</p>
          <p><strong>Описание:</strong> {data.weather[0].description}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            alt={data.weather[0].description} 
          />
        </div>
        
    </div>
  );
};

export default WeatherComponent;
