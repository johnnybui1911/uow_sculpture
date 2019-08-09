import { ASPECT_RATIO } from '../assets/dimension'

export const LATITUDE = -34.4054039 //-34.40798650811215
export const LONGITUDE = 150.87843 //150.8862846158445
export const LATITUDE_DELTA = 0.0274 //0.0274 //0.0066
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO //0.004

export const INITIAL_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

export const GOOGLE_MAPS_APIKEY = 'AIzaSyD9--JJbxDeQ9XaqBL2px1nmFVbRe2DdCs'
export const URL_TEMPLATE =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieW53dyIsImEiOiJjanlyNmg4dDYwN3Z6M210a3E2ZmJoemprIn0.yDLDtTyLhPBSI_qnjes0kw'
