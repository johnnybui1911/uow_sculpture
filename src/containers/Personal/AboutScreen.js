import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import * as WebBrowser from 'expo-web-browser'
import toQueryString from 'to-querystring'
import { connect } from 'react-redux'
import FeatureCard from './FeatureCard'
import styles from './styles'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import { signInRejected } from '../../redux/actions/authActions'
import { clearData } from '../../library/asyncStorage'

const AUTH0_DOMAIN = 'https://dev-t5oe7-d3.au.auth0.com'
const AUTH0_CLIENT_ID = 'kUKlrPhDkRIBsuPOL4c52uiZxN1N6eKK'

const _signOut = async props => {
  const result = await WebBrowser.openBrowserAsync(
    `${AUTH0_DOMAIN}/v2/logout?federated` +
      toQueryString({
        client_id: AUTH0_CLIENT_ID
      })
  )
  if (result.type === 'opened') {
    await clearData('auth')
    props.handleSignOut()
    props.navigation.navigate('Auth')
  }
}

const AboutScreen = props => {
  const username = props.username || 'Cristiano Ronaldo'
  const email = props.email || 'cristiano@gmail.com'
  const joinDate = props.joinDate || new Date('October 13, 2014')
  return (
    <View
      style={{
        flex: 1,
        padding: 24
      }}
    >
      <FeatureCard email={email} joinDate={joinDate} />
      <View style={styles.button}>
        <View style={{ flex: 1, padding: 20 }}>{icons.google}</View>
        <View style={{ position: 'absolute', left: 60 }}>
          <Text style={[styles.title, { fontSize: 16 }]}>{username}</Text>
          <Text style={(styles.description, { fontSize: 12 })}>
            Account name
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderWidth: 1,
            borderColor: palette.primaryColorLight
          }
        ]}
        onPress={async () => {
          await _signOut(props)
        }}
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
            SIGN OUT
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
  )
}

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => {
    dispatch(signInRejected())
  }
})

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(AboutScreen)
)
