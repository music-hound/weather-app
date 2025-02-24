import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { fetchForecastHourly } from "../state/forecastHourlySlice";

const ForecastHourly = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.forecastHourly
  );
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state : RootState) => state.city.name);
  
  useEffect(() => {
    dispatch(fetchForecastHourly( city ));
  }, [dispatch, city]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!data || !data.list) return <p>Нет данных</p>;

  return (
    <>
    <h2>Прогноз погоды на 5 дней</h2>
    <div style={{
      width:'90vw',
      textAlign: "left",
      border:'1px solid',
      borderRadius:'20px',
      overflow:'hidden',
      overflowX:'scroll',
    }}>
      <div
      style={{
      display:'flex',
      }}>
      {data.list.map((forecast, index) => (
        <div
          key={index}
          style={{
            flexShrink: 0,
            width:'300px',
            padding: "10px 20px",
          }}
        >
          <h3>{forecast.dt_txt}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt={forecast.weather[0].description}
          />
          <p>
            <strong>Температура:</strong> {forecast.main.temp}°C
          </p>
          <p>
            <strong>Ощущается как:</strong> {forecast.main.feels_like}°C
          </p>
          <p>
            <strong>Ветер:</strong> {forecast.wind.speed} м/с, направление {forecast.wind.deg}°
          </p>
          <p>
            <strong>Видимость:</strong> {forecast.visibility} м
          </p>
          <p>
            <strong>Облачность:</strong> {forecast.clouds.all}%
          </p>
          <p>
            <strong>Давление:</strong> {forecast.main.pressure} hPa
          </p>
          <p>
            <strong>Влажность:</strong> {forecast.main.humidity}%
          </p>
          <p>
            <strong>Снег за последние 3 часа:</strong> {forecast.snow?.["3h"] || 0} мм
          </p>
          <p>
            <strong>Описание:</strong> {forecast.weather[0].description}
          </p>
        </div>
      ))}
      </div>
    </div>
    </>
  );
};

export default ForecastHourly;
