import numeral from 'numeral'

export default distance => {
  if (parseFloat(distance) >= 1000) {
    return numeral(distance).format('0.0 a') + 'm'
  } else {
    return `${distance} m`
  }
}
