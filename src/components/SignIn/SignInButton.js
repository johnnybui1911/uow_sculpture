import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'
import { AuthSession } from 'expo'
import { connect } from 'react-redux'
import * as Crypto from 'expo-crypto'
import qs from 'qs'
import axios from 'axios'
import styles from './styles'
import palette from '../../assets/palette'
import {
  thunkSignIn,
  signInSuccesful,
  fetchUserDataThunk
} from '../../redux/actions/authActions'
import { storeData } from '../../library/asyncStorage'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../library/auth0'
import animations from '../../assets/animations'
import { withNavigation } from 'react-navigation'

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

class SignInButton extends React.PureComponent {
  state = {
    challenge: '',
    verifier: '',
    isLoading: false
  }

  componentDidMount() {
    this.generateChallenge()
  }

  generateChallenge = async () => {
    const verifier = await nanoid(45)
    // console.log('verifier', verifier)
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

    this.setState({ isLoading: true })
    // if (!__DEV__) {
    //   console.log('hello not dev')
    //   AuthSession.dismiss()
    // }
    if (response.type === 'success') {
      const { code } = response.params
      // console.log('code', code)
      // console.log('verifier', this.state.verifier)
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
        // console.log('final', auth)
        await storeData('auth', JSON.stringify(auth))
        this.props.thunkSignIn()
        // this.props.navigation.navigate('Personal')
      } catch (e) {
        console.log(e)
        this.setState({ isLoading: false })
      }
    } else {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { isLoading } = this.state

    return (
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
    )
  }
}

const mapDispatchToProps = dispatch => ({
  thunkSignIn: async () => {
    await dispatch(thunkSignIn())
    await dispatch(fetchUserDataThunk())
  },
  signInSuccesful: () => {
    dispatch(signInSuccesful())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(SignInButton))
