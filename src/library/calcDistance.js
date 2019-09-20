const calcDistance = (latLng1, latLng2) => {
  return Math.floor(haversine(latLng1, latLng2)) || 0
}

export default calcDistance
