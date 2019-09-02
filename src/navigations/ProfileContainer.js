import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'
import PersonalScreen from '../containers/Personal/PersonalScreen'
import AuthScreen from '../containers/Auth/AuthScreen'
import { refreshNewToken } from '../redux/actions/authActions'
import animations from '../assets/animations'
import { getData } from '../library/asyncStorage'

class AuthLoadingScreen extends React.PureComponent {
  componentDidMount = () => {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const auth = await getData('auth')
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
