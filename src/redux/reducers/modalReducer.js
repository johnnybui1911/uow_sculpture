import { OPEN_MODAL, CLOSE_MODAL } from '../../assets/actionTypes'
import { storeData } from '../../library/asyncStorage'

const initialState = {
  isCongratModalVisible: true,
  enteredMarkers: []
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      const { enteredMarkers } = action
      // console.log(enteredMarkers)
      return { ...state, isCongratModalVisible: true, enteredMarkers }
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
