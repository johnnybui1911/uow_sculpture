import axios from 'axios'

const baseAxios = axios.create({
  baseURL: 'https://uowac-api.herokuapp.com'
})

export default baseAxios
