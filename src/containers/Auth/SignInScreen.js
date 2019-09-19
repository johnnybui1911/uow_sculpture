import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { AuthSession } from 'expo'
import { connect } from 'react-redux'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { thunkSignIn, signInSuccesful } from '../../redux/actions/authActions'
import MidDivider from '../../components/MidDivider/MidDivider'
import { storeData } from '../../library/asyncStorage'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../library/auth0'

function toQueryString(params) {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
}

class SignInScreen extends React.Component {
  state = {
    email: '',
    password: ''
  }

  _loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    //`${Constants.linkingUri}`

    const queryParams = toQueryString({
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: redirectUrl,
      response_type: 'token',
      scope: 'openid email offline_access'
    })

    const authUrl = `${AUTH0_DOMAIN}/authorize?` + queryParams
    // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    // console.log(`AuthURL is:  ${authUrl}`)

    const response = await AuthSession.startAsync({
      authUrl: authUrl
    })

    if (response.type === 'success') {
      // console.log(response)
      const { refresh_token, expires_in, access_token } = response.params
      const expireDate = new Date(Date.now() + Number(expires_in) * 1000)
      console.log(expireDate)
      const auth = { token: access_token, refresh_token, expireDate }
      console.log('final', auth)
      await storeData('auth', JSON.stringify(auth))
      this.props.signInSuccesful()
      this.props.navigation.navigate('Personal')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', marginTop: 80 }}>
        <View
          style={{
            marginVertical: 30,
            alignItems: 'center'
          }}
        >
          <View style={{ textAlign: 'center' }}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.description}>
              Sign in to access your account
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.box,
              {
                alignItems: 'center',
                backgroundColor: palette.primaryColorLight,
                borderWidth: 1,
                borderColor: palette.primaryColorLight,
                marginBottom: 10
              }
            ]}
            onPress={this._loginWithAuth0}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.titleButton,
                  { color: palette.backgroundColorWhite }
                ]}
              >
                SIGN IN
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.box,
              {
                borderWidth: 1,
                borderColor: palette.primaryColorLight,
                elevation: 2
              }
            ]}
            onPress={this._loginWithAuth0}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: palette.primaryColorLight,
                    fontSize: 16,
                    textAlign: 'center'
                  }
                ]}
              >
                SIGN UP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  thunkSignIn: () => {
    dispatch(thunkSignIn())
  },
  signInSuccesful: () => {
    dispatch(signInSuccesful())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
