import { SIGN_IN_REJECTED, SIGN_IN_SUCCESSFULL } from '../../assets/actionTypes'

export const signInSuccesful = userAuth => {
  return { type: SIGN_IN_SUCCESSFULL, payload: { user: userAuth } }
}

export const signInRejected = () => {
  return { type: SIGN_IN_REJECTED }
}

export const thunkSignIn = userAuth => {
  return dispatch => {
    //   auth.onAuthStateChanged(async userAuth => {
    //     if (userAuth) {
    //   await
    if (userAuth) {
      setTimeout(() => {
        dispatch(signInSuccesful(userAuth))
      }, 0)
    } else {
      dispatch(signInRejected())
    }
    //     } else {
    //       await dispatch(signInRejected());
    //     }
    //   });
  }
}
