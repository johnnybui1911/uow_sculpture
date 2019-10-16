import React from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import { AuthHeader } from '../containers/Auth/AuthScreen'
import animations from '../assets/animations'
import { getData } from '../library/asyncStorage'
import palette from '../assets/palette'
import CustomStatusBar from '../components/CustomStatusBar'
import { NavigationEvents } from 'react-navigation'

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
        style={[{ flex: 1, backgroundColor: palette.backgroundColorWhite }]}
      >
        <NavigationEvents
          onWillFocus={() => {
            StatusBar.setBarStyle('light-content')
          }}
          onWillBlur={() => {
            StatusBar.setBarStyle('dark-content')
          }}
        />
        <CustomStatusBar backgroundColor={palette.primaryColor} />
        <AuthHeader />
        <View style={{ flex: 1, justifyContent: 'center' }}>
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
