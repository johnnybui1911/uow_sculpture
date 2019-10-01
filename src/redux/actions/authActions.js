import axios from 'axios'
import qs from 'qs'
import {
  SIGN_IN_REJECTED,
  SIGN_IN_SUCCESSFULL,
  FETCH_USER_DATA_SUCCESSFULL,
  FETCH_USER_DATA_REJECTED,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../../assets/actionTypes'
import { getData, storeData, clearData } from '../../library/asyncStorage'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../library/auth0'
import baseAxios from '../../library/api'

const initialUser = {}

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
  return { type: SIGN_IN_SUCCESSFULL, payload: { user: userAuth } }
}

export const signInRejected = () => {
  return { type: SIGN_IN_REJECTED }
}

export const addComment = comment => {
  return { type: ADD_COMMENT, payload: { comment } }
}

export const deleteComment = commentId => {
  return { type: DELETE_COMMENT, payload: { commentId } }
}

export const editComment = comment => {
  return { type: EDIT_COMMENT, payload: { comment } }
}

export const fetchUserDataThunk = (initialUserId = null) => {
  return (dispatch, getState) => {
    const user = getState().authReducer.user
    const userId = initialUserId ? initialUserId : user.userId
    return new Promise(async (resolve, reject) => {
      // if (userId) {
      try {
        const [likeList, commentList, visitList] = await Promise.all([
          baseAxios.get(`like/user-id/${userId}`).then(res => res.data),
          baseAxios.get(`comment/user-id/${userId}`).then(res => res.data),
          baseAxios.get(`visit/user-id/${userId}`).then(res => res.data)
        ])

        const formatCommentList = commentList.map(element => {
          const {
            commentId,
            content,
            user: { userId, picture },
            sculpture: { accessionId, images },
            updatedTime
          } = element
          return {
            commentId,
            text: content,
            userId,
            userImg: picture,
            sculptureId: accessionId,
            photoURL: images.length ? images[0].url : null,
            submitDate: updatedTime
          }
        })
        const formatVisitList = visitList.map(element => {
          const {
            visitId,
            user: { userId, picture },
            sculpture: { accessionId, images },
            visitTime
          } = element
          return {
            visitId,
            userId,
            sculptureId: accessionId,
            photoURL: images.length ? images[0].url : null,
            submitDate: visitTime
          }
        })
        dispatch(
          fetchUserDataSuccessful({
            likeList,
            commentList: formatCommentList,
            visitList: formatVisitList
          })
        )
      } catch (err) {
        console.log('Can not reload data user')
        dispatch(fetchUserDataRejected())
        // resolve()
      }
      // } else {
      //   console.log('Can not reload data user')
      //   dispatch(fetchUserDataRejected())
      // }
      resolve()
    })
  }
}

export const thunkSignIn = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const auth = await getData('auth')
      if (auth) {
        baseAxios
          .get('user/me')
          .then(res => {
            // console.log(res.data)
            const {
              userId,
              name,
              email,
              joinDate,
              picture,
              nickname
            } = res.data
            const user = {
              userId,
              username: userId.includes('auth0') ? nickname : name,
              email,
              joinDate,
              picture
            }
            dispatch(signInSuccesful(user))
            resolve()
            // dispatch(fetchUserDataThunk(userId))
            //   .then(() => {
            //     resolve()
            //   })
            //   .catch(() => {
            //     dispatch(signInRejected())
            //     resolve()
            //   })
          })
          .catch(e => {
            console.log('Can not sign in')
            dispatch(signInRejected())
            // clearData('auth')
            resolve()
          })
      } else {
        resolve()
        dispatch(signInRejected())
      }
    })
  }
}
