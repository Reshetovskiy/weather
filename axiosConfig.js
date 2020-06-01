import Axios from 'axios' 

export const axios = Axios.create({
    baseURL: "http://api.openweathermap.org"
})
