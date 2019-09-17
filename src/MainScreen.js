import React from 'react'
import { Platform, StatusBar, View, SafeAreaView, Text } from 'react-native'
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
  }

  componentDidMount = () => {
    // this.props.fetchDataThunk().then(res => {
    //   this.props.syncLocationThunk(res.data)
    // })
    // this.props.thunkSignIn()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
