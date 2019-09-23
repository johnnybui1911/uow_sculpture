import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SIGN_IN_SUCCESSFULL
} from '../../assets/actionTypes'
import { _sendLocalNotification } from '../../library/notificationTask'

const initialState = {
  isCongratModalVisible: false,
  enteredMarkers: []
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SIGN_IN_SUCCESSFULL: {
    //   return { ...state, enteredMarkers: [] }
    // }

    case OPEN_MODAL: {
      const { enteredMarkers } = action
      const oldMarkers = state.enteredMarkers
      let check = 0
      enteredMarkers.forEach(element => {
        const { id } = element
        if (oldMarkers.filter(item => item.id === id).length > 0) {
          check++
        }
      })

      if (check === oldMarkers.length && oldMarkers.length) {
        return { ...state, isCongratModalVisible: false }
      } else {
        enteredMarkers.forEach(element => {
          const { id, name } = element
          _sendLocalNotification({
            title: `Congratulations! You have visited ${name}.`,
            body: 'Tap to view more details',
            data: {
              screen: 'Detail',
              id
            }
          })
        })
        return { ...state, isCongratModalVisible: true, enteredMarkers }
      }
    }
    case CLOSE_MODAL: {
      return { ...state, isCongratModalVisible: false }
    }
    default: {
      return state
    }
  }
}

export default modalReducer
