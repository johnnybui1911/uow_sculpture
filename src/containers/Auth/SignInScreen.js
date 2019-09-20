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
import * as Crypto from 'expo-crypto'
import * as Random from 'expo-random'
import qs from 'qs'
import axios from 'axios'
import baseAxios from '../../library/api'
const nanoid = require('nanoid/async')

function toQueryString(params) {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
}

function base64URLEncode(str) {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

class SignInScreen extends React.Component {
  state = {
    email: '',
    password: '',
    challenge: '',
    verifier: ''
  }

  generateChallenge = async () => {
    const verifier = await nanoid(45)
    console.log('verifier', verifier)
    const challenge = base64URLEncode(
      await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        verifier,
        {
          encoding: Crypto.CryptoEncoding.BASE64
        }
      )
    )
    this.setState({ challenge, verifier })
  }

  componentDidMount() {
    this.generateChallenge()
  }

  _loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    //`${Constants.linkingUri}`

    const queryParams = toQueryString({
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: redirectUrl,
      response_type: 'code',
      scope: 'openid email offline_access',
      audience: 'https://uowac-api.herokuapp.com',
      code_challenge: this.state.challenge,
      code_challenge_method: 'S256'
    })

    const authUrl = `${AUTH0_DOMAIN}/authorize?` + queryParams
    // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    // console.log(`AuthURL is:  ${authUrl}`)

    const response = await AuthSession.startAsync({
      authUrl: authUrl
    })

    if (response.type === 'success') {
      const { code } = response.params
      console.log('code', code)
      console.log('verifier', this.state.verifier)
      const params = {
        method: 'POST',
        url: `${AUTH0_DOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
          grant_type: 'authorization_code',
          client_id: AUTH0_CLIENT_ID,
          code_verifier: this.state.verifier,
          code,
          redirect_uri: redirectUrl
        })
      }

      try {
        const exchangeResponse = await axios(params)
        const {
          refresh_token,
          expires_in,
          access_token
        } = exchangeResponse.data
        const expireDate = new Date(Date.now() + Number(expires_in) * 1000)
        const auth = { token: access_token, refresh_token, expireDate }
        console.log('final', auth)
        await storeData('auth', JSON.stringify(auth))

        const profile = (await baseAxios.get('/user/me')).data
        console.log('profile', profile)
      } catch (e) {
        console.log(e)
      }

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
