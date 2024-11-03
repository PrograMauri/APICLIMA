import { useMemo, useState } from "react";
import axios from "axios";
import { z } from "zod";


const climaSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    }),
  
});
const initialState = {
    name:'',
    main:{
        temp:0,
        temp_max:0,
        temp_min:0
    }

}
export type Clima = z.infer<typeof climaSchema>;

export default function useClima() {
    const [clima, setClima] = useState<Clima>(initialState);
    const climaExist =useMemo(() => clima.name,[clima])
    const [spinner,setSpinner] = useState(false)
    const [notCity,setNotCity] = useState(false)
    
    const fetchClima = async (buscar: { city: string; country: string }) => {
        setNotCity(false)
        const key = import.meta.env.VITE_API_KEY;
        setSpinner(true)
        setClima(initialState)
        
        try {
            const firstUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${buscar.city},${buscar.country}&appid=${key}`;
            const { data } = await axios.get(firstUrl);
            if(!data[0]){
                setNotCity(true)
                return
            }
            const lat = data[0].lat;
            const lon = data[0].lon;

            const secondUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const { data: secondData } = await axios.get(secondUrl);


            const result = climaSchema.safeParse(secondData);
            
            if(result.success) {
                setClima(result.data);
                setNotCity(false)
            } else {
       
            }
        } catch (error) {

        } finally{
            setSpinner(false)
        }
    };

   

    return {
        fetchClima,
        clima,
        climaExist,
        spinner,
        notCity
    };
}