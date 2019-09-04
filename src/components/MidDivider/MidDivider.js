import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { SCREEN_WIDTH } from '../../assets/dimension'

const styles = StyleSheet.create({
  lineSeparator: {
    height: 1,
    width: SCREEN_WIDTH / 2.2,
    backgroundColor: palette.backgroundTabColor
  },
  middleSeparator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    // marginTop: SCREEN_HEIGHT <= 812 ? 10 : 30,
    // marginBottom: SCREEN_HEIGHT <= 812 ? 20 : 40,
    height: 10
  },
  title: {
    fontSize: 14,
    color: palette.secondaryTypographyStrongColor,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center'
  }
})

const MidDivider = ({ children }) => {
  return (
    <View style={styles.middleSeparator}>
      <View
        style={{
          justifyContent: 'center'
        }}
      >
        <View style={styles.lineSeparator} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 10
        }}
      >
        {children ? children : <Text style={[styles.title]}>or</Text>}
      </View>

      <View
        style={{
          justifyContent: 'center'
        }}
      >
        <View style={styles.lineSeparator} />
      </View>
    </View>
  )
}

export default MidDivider
