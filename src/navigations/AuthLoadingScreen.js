import React from 'react'
import { View, SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native'
import { AuthHeader } from '../containers/Auth/AuthScreen'
import animations from '../assets/animations'
import { getData } from '../library/asyncStorage'
import palette from '../assets/palette'

export default class AuthLoadingScreen extends React.PureComponent {
  componentDidMount = () => {
    this._bootstrapAsync()
  }
  _bootstrapAsync = async () => {
    const auth = await getData('auth')
    this.props.navigation.navigate(auth ? 'PersonalStack' : 'Auth')
  }
  render() {
    return (
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: palette.backgroundColorWhite }]}
      >
        <AuthHeader />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LottieView source={animations.loadingPersonal} autoPlay auto />
        </View>
      </SafeAreaView>
    )
  }
}
