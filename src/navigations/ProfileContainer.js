/**
 * Description: Authorization Switch Navigator
 * Author: Nam Bui
 **/

import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import PersonalScreen from '../containers/Personal/PersonalScreen'
import AuthScreen from '../containers/Auth/AuthScreen'
import { refreshNewToken } from '../redux/actions/authActions'
import VisitScreen from '../containers/Personal/VisitScreen'
import EditProfile from '../containers/Personal/EditProfile'
import AuthLoadingScreen from './AuthLoadingScreen'

const mapStateToProps = getState => ({
  loggedIn: getState.authReducer.loggedIn
})

const AuthLoading = connect(mapStateToProps)(AuthLoadingScreen)

const PersonalStack = createStackNavigator(
  {
    Personal: {
      screen: PersonalScreen
    }
    // Visit: {
    //   screen: VisitScreen
    // },
    // EditProfile: {
    //   screen: EditProfile
    // }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Personal'
  }
)

const ProfileSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoading
    },
    PersonalStack: {
      screen: PersonalStack
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
