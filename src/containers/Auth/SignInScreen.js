import React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { AuthSession } from 'expo'
import { connect } from 'react-redux'
import toQueryString from 'to-querystring'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { thunkSignIn } from '../../redux/actions/authActions'
import MidDivider from '../../components/MidDivider/MidDivider'

const AUTH0_DOMAIN = 'https://dev-t5oe7-d3.au.auth0.com'
const AUTH0_CLIENT_ID = 'kUKlrPhDkRIBsuPOL4c52uiZxN1N6eKK'

class SignInScreen extends React.Component {
  state = {
    email: '',
    password: ''
  }

  _loginWithAuth0 = async () => {
    // this.props.handleAuthorize({ username: 'Name' })
    // this.props.navigation.navigate('Personal')

    const redirectUrl = AuthSession.getRedirectUrl()

    let authUrl =
      `${AUTH0_DOMAIN}/authorize?` +
      toQueryString({
        client_id: AUTH0_CLIENT_ID,
        response_type: 'token',
        scope: 'openid profile email',
        redirect_uri: redirectUrl
      })

    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    console.log(`AuthURL is:  ${authUrl}`)

    const result = await AuthSession.startAsync({
      authUrl: authUrl
    })

    if (result.type === 'success') {
      console.log(result)
      let token = result.params.access_token
      // this.props.setToken(token)
      // AuthSession.dismiss()
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
  handleAuthorize: userAuth => {
    dispatch(thunkSignIn(userAuth))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
