import { useState } from 'react'
import {countries} from '../data/paises'
import { Buscar} from '../types/types'


type formProps = {
  fetchClima: (buscar: Buscar) => Promise<void>
}
export default function FormLeft({fetchClima} : formProps) {

const [buscar,setBuscar] = useState<Buscar>({
  city:'',
  country:''
})

const [empty,setEmpty] = useState(false)

const handleChange = (e : React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement> ) =>{
  setBuscar({
    ...buscar,
    [e.target.name]: e.target.value
  })
  }
  
  const handleSubmit = (e :React.FormEvent<HTMLFormElement> ) =>{
     e.preventDefault()
      if(Object.values(buscar).includes('')){
          setEmpty(true)
      }else{
        setEmpty(false)
      }
     
      fetchClima(buscar)
  }


  return (
    <div>
       {empty && <p className='p-empty'>Todos los campos tienen que ser obligatorios.</p>}
      <form className="form"
      onSubmit={handleSubmit}
      >
          <div className="form-list">
            <label htmlFor="city">
                <p className="p-label">Ciudad:</p>
            </label>
            <input
            type="text"
            id="city"
            placeholder="Elige una ciudad"
            name="city"
            value={buscar.city}
            onChange={handleChange}
            >
            </input>
          </div>
          <div className='form-list'>
            <label>
                <p className="p-label">País:</p>
            </label>
            <select 
            name="country" 
            id="country"
            value={buscar.country}
            onChange={handleChange}
            >
            
               <option className='options'>--SELECCIONA UN PAÍS--</option>
                {countries.map(country =>(
                  
                    <option key={country.code} id='country' value={country.code} className='options'>{country.name}</option>
                   
                ))}

            </select>
          </div>
          <div className='button-list'  >
              <input value={'Buscar Clima'}
              type='submit'
              
              ></input>
              
          </div>
               
      </form>
     
    </div>
  )
}
