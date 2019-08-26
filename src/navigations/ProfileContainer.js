import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'
import PersonalScreen from '../containers/Personal/PersonalScreen'
import AuthScreen from '../containers/Auth/AuthScreen'
import { getData } from '../library/asyncStorage'
import { refreshNewToken } from '../redux/actions/authActions'
import animations from '../assets/animations'

class AuthLoadingScreen extends React.PureComponent {
  componentDidMount = () => {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const auth = await getData('auth')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(auth ? 'Personal' : 'Auth')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LottieView source={animations.loadingPersonal} autoPlay auto />
      </View>
    )
  }
}

const mapStateToProps = getState => ({
  loggedIn: getState.authReducer.loggedIn
})

const AuthLoading = connect(mapStateToProps)(AuthLoadingScreen)

const ProfileSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoading
    },
    Personal: {
      screen: PersonalScreen
    },
    Auth: {
      screen: AuthScreen
    }
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default ProfileSwitchNavigator
