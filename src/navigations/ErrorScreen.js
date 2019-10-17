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

const ErrorScreen = ({ resetData }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.backgroundColorWhite
      }}
    >
      {/* <View
        style={{
          width: 250,
          height: 250,
          borderRadius: 250,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      > */}
      <Image
        source={images.no_internet}
        style={{ width: 250, height: 250, borderRadius: 250 / 2 }}
        // resizeMode="contain"
      />
      {/* </View> */}

      <Text
        style={{
          ...styles.title,
          marginBottom: 12
        }}
      >
        Ooops!
      </Text>
      <Text
        style={{
          ...styles.description,
          marginBottom: 3
        }}
      >
        No Internet Connection Found
      </Text>
      <Text style={styles.description}>Check your connection</Text>
      <TouchableOpacity
        style={{ width: 140, marginTop: 24 }}
        onPress={() => resetData()}
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
          <Text style={styles.titleButton}>TRY AGAIN</Text>
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
)(ErrorScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorWhite
  },
  title: {
    fontSize: 26,
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
