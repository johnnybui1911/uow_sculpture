import numeral from 'numeral'
import {
  FETCH_DATA_SUCCESSFUL,
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_REJECTED,
  FETCH_DATA_PENDING,
  LIKE,
  UNLIKE,
  SET_LIKE_ID
} from '../../assets/actionTypes'
import baseAxios from '../../library/api'
import geofencingRegion from '../../containers/Map/Background/geofencingRegion'
import { fetchDistanceMatrix } from './distanceAction'
import { fetchUserDataThunk } from './authActions'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const fetchDataPending = () => {
  return { type: FETCH_DATA_PENDING, payload: { isLoading: true } }
}

export const fetchDataSuccessful = data => {
  return { type: FETCH_DATA_SUCCESSFUL, payload: { data, isLoading: false } }
}

export const fetchDataRejected = () => {
  return { type: FETCH_DATA_REJECTED, payload: { isLoading: false } }
}

export const selectMarker = selectedMarker => {
  return { type: MARKER_SELECTED, selectedMarker }
}

export const unselectMarker = () => {
  return { type: MARKER_UNSELECTED }
}

export const _like = (id, likeId) => {
  return { type: LIKE, id, likeId }
}

export const _setLikeId = (id, likeId) => {
  return { type: SET_LIKE_ID, id, likeId }
}

export const _unlike = id => {
  return { type: UNLIKE, id }
}

export const fetchDataThunk = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchDataPending())

      baseAxios
        .get('sculpture')
        .then(res => {
          return res.data
        })
        .then(data => {
          const newData = data.map(marker => {
            const {
              accessionId,
              name,
              longitude,
              latitude,
              productionDate,
              material,
              creditLine,
              locationNotes,
              primaryMaker: { firstName, lastName },
              images,
              totalLikes,
              totalVisits,
              totalComments
            } = marker
            const newMarker = {
              id: accessionId,
              name,
              des: '',
              features: {
                date: productionDate,
                maker: `${firstName} ${capitalizeFirstLetter(
                  lastName.toLowerCase()
                )}`,
                material
              },
              description: {
                location: locationNotes,
                creditLine
              },
              photoURL: images.length === 0 ? null : images[0].url,
              coordinate: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
              },
              imageList: images,
              distance: '',
              duration: '',
              likeCount: Number(totalLikes),
              commentCount: Number(totalComments),
              visitCount: Number(totalVisits)
            }
            return newMarker
          })
          return newData
        })
        .then(async newData => {
          const { userCoordinate } = getState().locationReducer
          dispatch(fetchDataSuccessful(newData))
          await dispatch(fetchUserDataThunk())
          await dispatch(fetchDistanceMatrix(userCoordinate, newData))
          resolve({ data: newData })
          // geofencingRegion(newData)
        })
        .catch(e => {
          console.log(e.message)
          console.log('error fetch data thunk')
          dispatch(fetchDataRejected())
          reject()
        })
    })
  }
}
