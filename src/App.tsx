
import './App.css'
import FormLeft from './components/FormLeft'
import FormRight from './components/FormRight'
import Spinner from './components/Spinner'
import useClima from './hooks/useClima'


function App() {
  const { fetchClima, clima, climaExist, spinner,notCity } = useClima();

  return (
    <>
      <div>
        <div className='section'>
          <h1 className='title'>Buscador de Clima - <span className='yellow'>MauriWeather</span></h1>
          <div className='main'>
            <div className='grid-left'>
              <FormLeft fetchClima={fetchClima} />
            </div>
            <div className='grid-right'>
              {spinner && <Spinner />}
          
              {climaExist && !spinner && (
                <FormRight clima={clima} />
              )}
              {notCity && (
                <p className='p-found'>La ciudad no se encontró.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App
