import {
  SYNC_LOCATION_SUCCESSFULL,
  SYNC_LOCATION_REJECTED
} from '../../assets/actionTypes'

const initialState = {
  userCoordinate: null
  // {
  //   latitude: -34.4114455,
  //   longitude: 150.8939863
  // }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SYNC_LOCATION_SUCCESSFULL: {
      return { ...state, userCoordinate: action.userCoordinate }
    }
    case SYNC_LOCATION_REJECTED: {
      return state
    }
    default:
      return state
  }
}
