import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Divider from '../../components/Divider/Divider'
import styles from './styles'
import MapView, { UrlTile, Marker } from 'react-native-maps'
import MarkerView from '../Map/MarkerView'

export default function MapCard(props) {
  const { item, _navigateToMap } = props
  const region = {
    ...item.coordinate,
    latitudeDelta: 0.0066,
    longitudeDelta: 0.004,
  }
  return (
    <View style={styles.card}>
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
        <MarkerView
          marker={item}
          selected={true}
          // _selectMarker={this._selectMarker}
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
