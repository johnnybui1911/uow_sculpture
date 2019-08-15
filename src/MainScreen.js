import React from 'react'
import {
  Platform,
  StatusBar,
  View,
  Animated,
  PanResponder,
  SafeAreaView,
  Text
} from 'react-native'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { syncLocationThunk } from './redux/actions/locationActions'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from './assets/dimension'
import { AppContainer } from './navigations/AppStack'
import IntroScreen from './containers/Introduction/IntroScreen'

// TODO: just swipe up, not swipe down
class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.position = new Animated.ValueXY()
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          this.position.setValue({ x: 0, y: gestureState.dy })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // dy - accumulated distance of the gesture since the touch started
        // vy - current velocity of the gesture
        // when user swipe a half of screen
        if (-gestureState.dy > 200 && -gestureState.vy > 0.1) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT },
            duration: 400
          }).start()
          // animate position value top (y) into "-SCREEN_HEIGHT" -> make disappear
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
          }).start()
        }
      }
    })
  }

  componentWillMount = () => {
    this.props.syncLocationThunk()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          }}
        >
          <AppContainer />
        </View>
        <Animated.View
          style={{
            left: this.position.x,
            top: this.position.y,
          }}
          {...this._panResponder.panHandlers}
        >
          <IntroScreen />
        </Animated.View> */}
        {Platform.OS === 'android' ? (
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
            translucent
          />
        ) : null}
        <AppContainer />
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = {
  syncLocationThunk
}

export default connect(
  null,
  mapDispatchToProps
)(MainScreen)
