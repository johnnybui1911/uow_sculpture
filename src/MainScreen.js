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
import Modal from 'react-native-modal'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import {
  syncLocationThunk,
  thunkSignIn,
  fetchDataThunk,
  fetchDistanceMatrix
} from './redux/actions'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from './assets/dimension'
import { AppContainer } from './navigations/AppStack'
import IntroScreen from './containers/Introduction/IntroScreen'
import palette from './assets/palette'

// TODO: just swipe up, not swipe down
class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: true
    }
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

  componentDidMount = () => {
    this.props.fetchDataThunk().then(res => {
      this.props.syncLocationThunk(res.data)
    })
    this.props.thunkSignIn()

    // this.props.syncLocationThunk().then(res => {
    //   this.props.fetchDataThunk(res.coordinate).then(res => {
    //     this.props.fetchDistanceMatrix(
    //       res.userCoordinate,
    //       res.data.filter(item => item.coordinate.latitude)
    //     )
    //   })
    // })
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
            backgroundColor="rgba(0,0,0,0.6)"
            translucent
          />
        ) : null}
        <AppContainer />
        {/* {this.state.isModalVisible && (
          <View
            style={{
              position: 'absolute',
              height: STATUS_BAR_HEIGHT,
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: palette.primaryColor
            }}
          />
        )}
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="slideInDown"
          animationInTiming={500}
          onSwipeComplete={() => this.setState({ isModalVisible: false })}
          swipeDirection="up"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0
          }}
        >
          <IntroScreen />
        </Modal> */}
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = {
  syncLocationThunk,
  thunkSignIn,
  fetchDataThunk,
  fetchDistanceMatrix
}

export default connect(
  null,
  mapDispatchToProps
)(MainScreen)
