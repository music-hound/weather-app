import './App.css'
import WeatherComponent from './components/WeatherComponent.tsx'

function App() {

  return (
    <>
      <div
      style={{
        width:'100%',
        display:'flex',
        justifyContent:'center'
      }}>
        <WeatherComponent />
      </div>
    </>
  )
}

export default App
