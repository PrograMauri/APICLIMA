

export const kelvinTransform = (temperatura : number) =>{
    const kelvin = parseInt((temperatura - 273.15).toString())
    return kelvin
}