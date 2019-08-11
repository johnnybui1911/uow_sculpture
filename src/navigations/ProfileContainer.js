import React from 'react'
import { connect } from 'react-redux'
import PersonalScreen from '../containers/Personal/PersonalScreen'
import AuthScreen from '../containers/Auth/AuthScreen'

const ProfileContainer = ({ loggedIn }) => {
  if (loggedIn) {
    return <PersonalScreen />
  }
  return <AuthScreen />
}

const mapStateToProps = getState => ({
  loggedIn: getState.authReducer.loggedIn
})

export default connect(mapStateToProps)(ProfileContainer)
