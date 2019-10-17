import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import palette from './assets/palette'
import { ButtonMyLocation } from './components'

class ErrorScreen extends React.PureComponent {
  render() {
    const { errorMessage, onButtonPress } = this.props
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: palette.primaryColor,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24
          }}
        >
          <Text
            style={{
              color: '#fff',
              marginBottom: 12,
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 12,
              textAlign: 'center'
            }}
          >
            {errorMessage}
          </Text>
          <ButtonMyLocation _centerUserLocation={onButtonPress} />
        </View>
      </SafeAreaView>
    )
  }
}

export default ErrorScreen
