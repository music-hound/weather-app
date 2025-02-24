import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../state/store';
import { fetchWeather } from "../state/weatherNowSlice";
import { cityChange } from "../state/citySlice";

const WeatherNow = () => {

  const { data, loading, error } = useSelector((state: RootState) => state.weatherNow);
  const city = useSelector((state : RootState) => state.city.name);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);



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
      textAlign:'left',
    }}>
      <button onClick={() => dispatch(cityChange("moscow"))}>
        Поменять город на Москву
      </button>
      <div>
        <img 
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
          alt={data.weather[0].description} 
        />
        <h2>Погода в городе {data.name}, {data.sys.country}</h2>
        <p><strong>Температура:</strong> {data.main.temp}°C</p>
        <p><strong>Ощущается как:</strong> {data.main.feels_like}°C</p>
        <p><strong>Ветер:</strong> {data.wind.speed} м/с, направление {data.wind.deg}°</p>
        <p><strong>Видимость:</strong> {data.visibility} м</p>
        <p><strong>Облачность:</strong> {data.clouds.all}%</p>
        <p><strong>Давление:</strong> {data.main.pressure} hPa</p>
        <p><strong>Влажность:</strong> {data.main.humidity}%</p>
        <p><strong>Снег за последний час:</strong> {data.snow?.["1h"] || 0} мм</p>
        <p><strong>Описание:</strong> {data.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherNow;
