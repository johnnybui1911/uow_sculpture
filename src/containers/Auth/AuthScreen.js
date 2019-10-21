/**
 * Description: Authorization Screen (Sign In / Sign Up)
 * Author: Nam Bui
 **/

import React from 'react'
import { SafeAreaView, View, StatusBar, Platform } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import Svg, { Ellipse } from 'react-native-svg'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import SignInScreen from './SignInScreen'
import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../assets/dimension'
import CustomStatusBar from '../../components/CustomStatusBar'

const HEADER_HEIGHT = 209

export const AuthHeader = () => (
  <View style={styles.header}>
    <Svg
      style={{ position: 'absolute', top: 0 }}
      height={500}
      width={SCREEN_WIDTH + 5}
    >
      <Ellipse
        cx={SCREEN_WIDTH / 2 + 5}
        cy={100}
        rx={330}
        ry={200}
        fill={palette.primaryColor}
      />
    </Svg>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        paddingRight: 40
      }}
    >
      {icons.logo}
    </View>
  </View>
)

class AuthScreen extends React.PureComponent {
  render() {
    return (
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: palette.primaryColor }]}
      >
        <NavigationEvents
          onDidFocus={() => {
            StatusBar.setBarStyle('light-content')
            if (this.props.loggedIn) {
              this.props.navigation.navigate('Personal')
            }
          }}
          onWillBlur={() => {
            Platform.OS === 'ios' && StatusBar.setBarStyle('dark-content')
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 200,
            top: 0,
            backgroundColor: palette.primaryColor
          }}
        />
        <AuthHeader />
        <SignInScreen navigation={this.props.navigation} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  loggedIn: getState.authReducer.loggedIn
})

export default connect(mapStateToProps)(AuthScreen)
