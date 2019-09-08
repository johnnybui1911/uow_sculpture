import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import LottieView from 'lottie-react-native'
import { icons } from '../../assets/icons'
import animations from '../../assets/animations'

const UserLocationButton = ({
  fetchDataThunk,
  selectedMarker,
  _sendLocalNotification,
  calcDistance,
  refFunc,
  userCoordinate,
  _centerUserLocation,
  _animateCeleb,
  loopAnimate
}) => {
  return (
    <Marker.Animated
      //   ref={marker => {
      //     marker = marker
      //   }}

      ref={refFunc}
      style={{ zIndex: 2 }}
      anchor={{ x: 0.5, y: 0.5 }}
      coordinate={userCoordinate}
      onPress={_centerUserLocation}
      draggable
      onDragEnd={e => {
        const userLocation = e.nativeEvent.coordinate

        const travelDistance = calcDistance(
          userLocation,
          userCoordinate.__getValue()
        )

        userCoordinate.setValue({
          ...userLocation,
          latitudeDelta: 0,
          longitudeDelta: 0
        })

        travelDistance >= 10 && fetchDataThunk(userLocation) // each 10m, sync position again to fecth data
        // .then(res => console.log(res))

        if (selectedMarker) {
          const distance = calcDistance(
            e.nativeEvent.coordinate,
            selectedMarker.coordinate
          )

          if (distance <= 20) {
            const message = {
              title: 'Congratulation',
              body: 'You have finished your trip !!!',
              data: {
                screen: 'Detail',
                id: selectedMarker.id
              }
            }
            _animateCeleb()
            // setState({ isModalVisible: true })
            _sendLocalNotification(message)
            // _sendPushNotification(message)
          }
        }
      }}
    >
      <View style={{ padding: 35 }}>
        {icons.user_location}
        <LottieView
          style={{
            zIndex: -1,
            elevation: 0
          }}
          progress={loopAnimate}
          source={animations.beacon}
          // autoPlay
          // loop
        />
      </View>
    </Marker.Animated>
  )
}

export default UserLocationButton
