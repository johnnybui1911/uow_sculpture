import { Platform } from 'react-native'
import { ASPECT_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH } from '../assets/dimension'

export const LATITUDE = -34.40476715934101 //-34.40798650811215
export const LONGITUDE = 150.87847704067826 //150.87847704067826 //150.8862846158445
export const LATITUDE_DELTA = 0.011614657897837333 //0.0274 //0.0066
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO //0.004

export const USER_LATITUDE = -34.4071659
export const USER_LONGITUDE = 150.877994

export const DEFAULT_EDGE_PADDING =
  Platform.OS === 'android'
    ? {
        top: SCREEN_HEIGHT * 0.8,
        bottom: SCREEN_HEIGHT * 0.8,
        left: SCREEN_WIDTH / 4,
        right: SCREEN_WIDTH / 4
      }
    : {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      }

export const INITIAL_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

export const GOOGLE_MAPS_APIKEY = 'AIzaSyCoajIyj5wpNXJuemJ3PgozbhiyXA0rIac' // 'AIzaSyD9--JJbxDeQ9XaqBL2px1nmFVbRe2DdCs'
export const URL_TEMPLATE =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieW53dyIsImEiOiJjanlyNmg4dDYwN3Z6M210a3E2ZmJoemprIn0.yDLDtTyLhPBSI_qnjes0kw'
export const DISTANCE_MATRIX_API =
  'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&language=en&mode=walking'
