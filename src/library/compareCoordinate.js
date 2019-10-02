import numeral from 'numeral'
import haversine from 'haversine-distance'

export function formatNumber(number) {
  return numeral(number).format('0[.]00000')
}

export function compareCoordinate(coor1, coor2) {
  return (
    formatNumber(coor1.latitude) === formatNumber(coor2.latitude) &&
    formatNumber(coor1.longitude) === formatNumber(coor2.longitude)
  )
}
