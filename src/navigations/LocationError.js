/**
 * Description: Can't reach Location Permission Screen
 * Author: Nam Bui
 **/

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import palette from '../assets/palette'
import images from '../assets/images'
import {
  thunkSignIn,
  fetchDataThunk,
  syncLocationThunk
} from '../redux/actions'
import { _alertLocationPermission } from '../redux/actions/locationActions'

const LocationError = ({ resetData }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.backgroundColorWhite,
        paddingHorizontal: 24
      }}
    >
      <Image
        source={images.no_location}
        style={{ width: 200, height: 200, marginBottom: 24 }}
        // resizeMode="contain"
      />
      <Text
        style={{
          ...styles.title,
          marginBottom: 12
        }}
      >
        {`We Can't Find Your Location`}
      </Text>
      <Text
        style={{
          ...styles.description,
          marginBottom: 3,
          textAlign: 'center'
        }}
      >
        Please allow UOW Sculptures
      </Text>
      <Text style={styles.description}>to access your location</Text>
      <TouchableOpacity
        style={{ width: 140, marginTop: 24 }}
        onPress={() => _alertLocationPermission()}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 4,
            backgroundColor: palette.primaryColorLight
          }}
        >
          <Text style={styles.titleButton}>SETTING</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  resetData: async () => {
    // await dispatch(thunkSignIn())
    await dispatch(fetchDataThunk())
    await dispatch(syncLocationThunk())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(LocationError)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorWhite
  },
  title: {
    fontSize: 22,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold'
  },
  titleButton: {
    fontSize: 16,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center'
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: palette.primaryColorLight
  },
  description: {
    fontSize: 16,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-Medium'
  },
  description_cmt: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-Medium'
  },
  alt_description: {
    fontSize: 14,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-Medium'
  },
  numberStyle: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold',
    paddingLeft: 5
  }
})
