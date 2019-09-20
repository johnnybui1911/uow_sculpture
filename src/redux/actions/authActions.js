import axios from 'axios'
import qs from 'qs'
import {
  SIGN_IN_REJECTED,
  SIGN_IN_SUCCESSFULL,
  FETCH_USER_DATA_SUCCESSFULL,
  FETCH_USER_DATA_REJECTED,
  ADD_COMMENT
} from '../../assets/actionTypes'
import { getData, storeData } from '../../library/asyncStorage'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../library/auth0'

const initialUser = {
  user: {
    userId: 'hnb133',
    username: 'Cristiano Ronaldo',
    email: 'cristiano@gmail.com',
    joinDate: new Date('October 13, 2014'),
    comments: 3,
    visited: 3
  }
}

const userData = {
  likeList: [
    { sculptureId: 1986.058, userId: 'hnb133' },
    { sculptureId: 1987.08, userId: 'hnb133' },
    { sculptureId: 1987.081, userId: 'hnb133' },
    { sculptureId: 1989.067, userId: 'hnb133' }
  ],
  commentList: [
    {
      sculptureId: 1986.058,
      text: 'Hello',
      submitDate: new Date(2019, 5, 24, 10, 33, 30)
    },
    {
      sculptureId: 1987.08,
      text:
        'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
      submitDate: new Date(2019, 5, 29, 10, 33, 30)
    },
    {
      sculptureId: 2001.076,
      text: 'One of the best sculpture I have ever seen. ',
      submitDate: new Date()
    }
  ]
}

export const fetchUserDataSuccessful = (data = userData) => {
  return { type: FETCH_USER_DATA_SUCCESSFULL, payload: data }
}

export const fetchUserDataRejected = () => {
  return { type: FETCH_USER_DATA_REJECTED }
}

export const signInSuccesful = (userAuth = initialUser) => {
  return { type: SIGN_IN_SUCCESSFULL, payload: { ...userAuth } }
}

export const signInRejected = () => {
  return { type: SIGN_IN_REJECTED }
}

export const addComment = comment => {
  return { type: ADD_COMMENT, payload: { comment } }
}

export const fetchUserDataThunk = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      // const auth = await getData('auth')
      // if (auth) {
      //   // send GET to back end to fetch user data
      dispatch(fetchUserDataSuccessful())
      resolve()
      // } else {
      //   dispatch(fetchUserDataRejected())
      //   reject({ errorMessage: 'Error' })
      // }
    })
  }
}

export const thunkSignIn = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const auth = await getData('auth')
      if (auth) {
        // send GET to back end to fetch user data
        dispatch(signInSuccesful())
        dispatch(fetchUserDataThunk())
        resolve()
      } else {
        dispatch(signInRejected())
        reject({ errorMessage: 'Error' })
      }
    })
  }
}

export const refreshNewToken = async () => {
  const auth = await getData('auth')
  const { token, refresh_token, expires_in } = JSON.parse(auth)

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

  const new_auth = {
    token: response.data.access_token,
    refresh_token,
    expires_in: response.data.expires_in
  }
  await storeData('auth', JSON.stringify(new_auth))
}
