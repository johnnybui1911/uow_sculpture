import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../library/auth0'
import qs from 'qs'

const baseAxios = axios.create({
  baseURL: 'https://uowac-api.herokuapp.com'
})

baseAxios.interceptors.request.use(
  async config => {
    console.log('intercepted axios')
    const rawAuth0 = await AsyncStorage.getItem('auth')
    if (rawAuth0) {
      const auth0 = JSON.parse(rawAuth0)
      console.log('interceptor auth', auth0)
      let { token, refresh_token, expireDate } = auth0
      if (token) {
        if (new Date() >= new Date(expireDate)) {
          // get new access token using refresh token
          const response = await axios({
            method: 'POST',
            url: `${AUTH0_DOMAIN}/oauth/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
              grant_type: 'refresh_token',
              client_id: AUTH0_CLIENT_ID,
              refresh_token: refresh_token
            })
          })

          console.log('refresh token response', response.data)
          token = response.data.access_token
          expireDate = new Date(
            Date.now() + Number(response.data.expires_in) * 1000
          )

          const new_auth = {
            token,
            refresh_token,
            expireDate
          }
          await AsyncStorage.setItem('auth', JSON.stringify(new_auth))
        }
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  error => {
    console.log('error axios!!!!!')
    return Promise.reject(error)
  }
)

export default baseAxios
