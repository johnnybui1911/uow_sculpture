import React from 'react'
import { View, SafeAreaView, StatusBar, Platform } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import { AuthHeader } from '../containers/Auth/AuthScreen'
import animations from '../assets/animations'
import { getData } from '../library/asyncStorage'
import palette from '../assets/palette'

class AuthLoadingScreen extends React.PureComponent {
  componentDidMount = () => {
    this._bootstrapAsync()
  }
  _bootstrapAsync = async () => {
    const auth = await getData('auth')
    const { loggedIn } = this.props
    this.props.navigation.navigate(auth && loggedIn ? 'PersonalStack' : 'Auth')
  }
  render() {
    return (
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: palette.primaryColor }]}
      >
        <NavigationEvents
          onWillFocus={() => {
            StatusBar.setBarStyle('light-content')
          }}
          onWillBlur={() => {
            Platform.OS === 'ios' && StatusBar.setBarStyle('dark-content')
          }}
        />
        <AuthHeader />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: palette.backgroundColorWhite
          }}
        >
          <LottieView source={animations.loadingPersonal} autoPlay auto />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  loggedIn: getState.authReducer.loggedIn,
  isLoadingUser: getState.markerReducer.isLoadingUser
})

export default connect(mapStateToProps)(AuthLoadingScreen)
