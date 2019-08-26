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
import { thunkSignIn } from '../../redux/actions/authActions'
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
      scope: 'openid email offline_access '
    })

    const authUrl = `${AUTH0_DOMAIN}/authorize?` + queryParams
    // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    // console.log(`AuthURL is:  ${authUrl}`)

    const response = await AuthSession.startAsync({
      authUrl: authUrl
    })

    if (response.type === 'success') {
      // console.log(response)
      const { refresh_token, expires_in, token } = response.params
      const auth = { token, refresh_token, expires_in }
      await storeData('auth', JSON.stringify(auth))
      this.props.thunkSignIn()
      this.props.navigation.navigate('Personal')
    }
  }

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginVertical: 10
            }}
          >
            <View style={{}}>
              <Text style={styles.title}>Sign in with</Text>
            </View>
            <TouchableOpacity
              style={[styles.box, { marginVertical: 10 }]}
              onPress={this._loginWithAuth0}
            >
              <View style={{ flex: 1 }}>{icons.google}</View>
              <View style={{ position: 'absolute' }}>
                <Text style={styles.titleButton}>GOOGLE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, { backgroundColor: palette.facebookColor }]}
            >
              <View style={{ flex: 1 }}>{icons.facebook}</View>
              <View style={{ position: 'absolute' }}>
                <Text
                  style={[
                    styles.titleButton,
                    { color: palette.backgroundColorWhite }
                  ]}
                >
                  FACEBOOK
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <MidDivider />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10
            }}
          >
            <View style={styles.inputBox}>
              <View>{icons.mail}</View>
              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                style={styles.input}
              />
            </View>
            <View style={[styles.inputBox, { marginTop: 10 }]}>
              <View>{icons.lock}</View>
              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={[styles.title, { fontSize: 14 }]}>
                Dont't remember your password?
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.box,
                {
                  alignItems: 'center',
                  backgroundColor: palette.primaryColorLight
                }
              ]}
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
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  thunkSignIn: () => {
    dispatch(thunkSignIn())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
