import React from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Svg, { Ellipse } from 'react-native-svg'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import SignInScreen from './SignInScreen'
import { SCREEN_WIDTH } from '../../assets/dimension'
import { NavigationEvents } from 'react-navigation'
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
        style={[{ flex: 1, backgroundColor: palette.backgroundColorWhite }]}
      >
        <NavigationEvents
          onDidFocus={() => {
            StatusBar.setBarStyle('light-content')
            if (this.props.loggedIn) {
              this.props.navigation.navigate('Personal')
            }
          }}
          onWillBlur={() => {
            StatusBar.setBarStyle('dark-content')
          }}
        />
        <CustomStatusBar backgroundColor={palette.primaryColor} />
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
