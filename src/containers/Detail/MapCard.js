import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps'
import styles from './styles'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import { URL_TEMPLATE } from '../../library/maps'

export default withNavigation(function MapCard(props) {
  const { item, elevation } = props
  const cardStyle = [styles.card, { elevation, marginBottom: 3 }]
  const region = {
    ...item.coordinate,
    latitudeDelta: 0.0066,
    longitudeDelta: 0.004
  }

  const _navigateToMap = () => {
    const goBackMap = props.navigation.getParam('goBackMap', false)
    goBackMap
      ? props.navigation.goBack()
      : props.navigation.navigate('Map', { detailMarker: item, showTab: false }) // FIXME: map center jf not oppen map first
  }

  return (
    <View style={cardStyle}>
      <Text style={[styles.title, { fontSize: 20 }]}>Map</Text>
      <View
        style={{
          flex: 1,
          height: 350,
          borderRadius: 12,
          overflow: 'hidden',
          marginVertical: 14
        }}
      >
        <MapView
          style={{ flex: 1 }}
          mapType={Platform.OS === 'android' ? 'none' : 'standard'}
          provider={Platform.OS === 'ios' ? 'google' : null}
          initialRegion={region}
          showsCompass={false}
          scrollEnabled={false}
          loadingEnabled
          zoomEnabled={false}
        >
          {Platform.OS === 'android' && (
            <UrlTile urlTemplate={URL_TEMPLATE} maximumZ={19} zIndex={-1} />
          )}
          <Marker zIndex={1} coordinate={item.coordinate}>
            <View
              style={{
                paddingBottom: 5
              }}
            >
              {icons.marker}
            </View>
          </Marker>
        </MapView>
      </View>
      <TouchableOpacity onPress={_navigateToMap} style={[styles.button]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titleButton]}>SHOW MAP</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
})
