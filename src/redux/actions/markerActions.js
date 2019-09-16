import numeral from 'numeral'
import {
  FETCH_DATA_SUCCESSFUL,
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_REJECTED,
  FETCH_DATA_PENDING
} from '../../assets/actionTypes'
import baseAxios from '../../library/api'
import { fetchDistanceMatrix } from './distanceAction'

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

export const fetchDataThunk = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(fetchDataPending())

      baseAxios
        .get('/sculpture')
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
              images
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
              duration: ''
            }
            return newMarker
          })
          return newData
        })
        .then(newData => {
          dispatch(fetchDataSuccessful(newData))
          resolve({ data: newData })
        })
        .catch(e => {
          dispatch(fetchDataRejected())
          reject()
        })
    })
  }
}
