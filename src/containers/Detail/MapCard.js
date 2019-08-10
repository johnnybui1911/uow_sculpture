import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MapView, { UrlTile, Marker } from 'react-native-maps'
import styles from './styles'
import images from '../../assets/images'

export default function MapCard(props) {
  const { item, _navigateToMap, elevation } = props
  const cardStyle = [styles.card, { elevation, marginBottom: 3 }]
  const region = {
    ...item.coordinate,
    latitudeDelta: 0.0066,
    longitudeDelta: 0.004
  }
  return (
    <View style={cardStyle}>
      <Text style={[styles.title, { fontSize: 20 }]}>Map</Text>
      <MapView
        style={{ flex: 1, height: 350, marginVertical: 14 }}
        mapType="none"
        initialRegion={region}
        showsCompass={false}
        scrollEnabled={false}
        loadingEnabled
      >
        <UrlTile
          urlTemplate="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieW53dyIsImEiOiJjanlyNmg4dDYwN3Z6M210a3E2ZmJoemprIn0.yDLDtTyLhPBSI_qnjes0kw"
          maximumZ={19}
          zIndex={-1}
        />
        <Marker
          zIndex={1}
          coordinate={item.coordinate}
          image={images.chosen_marker}
        />
        {/* <Marker coordinate={item.coordinate} title={item.title} zIndex={1} /> */}
      </MapView>
      <TouchableOpacity onPress={_navigateToMap} style={[styles.button]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titleButton]}>SHOW MAP</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
