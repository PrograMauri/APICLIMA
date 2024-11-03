import { Clima } from "../hooks/useClima"
import {kelvinTransform} from '../help/help'

type formRightProps = {
    clima:Clima
}


export default function FormRight({clima} :formRightProps )  {
  return (
    <div className="div-right">
    <p className="p-right">El clima en: <span className="p-right-s">{clima.name}</span></p>
    <p className="p-temp">Temp: {kelvinTransform(clima.main.temp)}&deg;C</p>
    <p className="p-temp-m">Temp max: {kelvinTransform(clima.main.temp_max)}&deg;C</p>
    <p className="p-temp-m">Temp min: {kelvinTransform(clima.main.temp_min)}&deg;C</p>
  </div>
  )
}
