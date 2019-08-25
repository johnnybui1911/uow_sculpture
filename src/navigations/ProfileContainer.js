import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation'
import { connect } from 'react-redux'
import PersonalScreen from '../containers/Personal/PersonalScreen'
import AuthScreen from '../containers/Auth/AuthScreen'

class AuthLoadingScreen extends React.PureComponent {
  componentDidMount = () => {
    this._bootstrapAsync()
  }

  _bootstrapAsync = () => {
    const { loggedIn } = this.props
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(loggedIn ? 'Personal' : 'Auth')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
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
