import { useDispatch } from 'react-redux';
import './App.css'
import ForecastHourly from './components/ForecastHourly.tsx'
import WeatherNow from './components/WeatherNow.tsx'
import { toggleTheme } from './state/actions.ts';

function App() {

  const dispatch = useDispatch();

  return (
    <>
      <div
      style={{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
      }}>
        <WeatherNow />
        <ForecastHourly />
        <button onClick={() => dispatch(toggleTheme())}>toggleTheme</button>
      </div>
    </>
  )
}

export default App
