/*
Nam Hoang Bui - 5520125 - UOW Sculptures
*/
import React from 'react'
import {
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import {
  syncLocationThunk,
  thunkSignIn,
  fetchDataThunk,
  fetchDistanceMatrix
} from './redux/actions'
import {
  STATUS_BAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  FULL_SCREEN_HEIGHT
} from './assets/dimension'
import { AppContainer } from './navigations/AppStack'
import IntroScreen from './containers/Introduction/IntroScreen'
import palette from './assets/palette'
import { icons } from './assets/icons'
import CongratModal from './components/CongratModal/CongratModal'
import { storeData, getData, clearData } from './library/asyncStorage'
import { SafeAreaConsumer } from 'react-native-safe-area-context'
import ErrorScreen from './navigations/ErrorScreen'
import LocationError from './navigations/LocationError'

const MainView = Platform.OS === 'ios' ? View : SafeAreaView

// clearData('intro')
class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      isCongratModalVisible: false,
      isNetworkConnect: true
    }
  }
  resetData = async () => {
    const { thunkSignIn, fetchDataThunk, syncLocationThunk } = this.props
    await thunkSignIn()
    await fetchDataThunk()
    await syncLocationThunk()
  }

  componentDidMount = async () => {
    const intro = await getData('intro')
    this.setState({ isModalVisible: intro ? false : true })
    this.unsubscribeNetwork = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type)
      console.log('Is connected?', state.isConnected)
      this.setState(prevState => {
        if (!prevState.isNetworkConnect && state.isConnected) {
          this.resetData()
        }
        return { isNetworkConnect: state.isConnected }
      })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeNetwork()
  }

  _swipeUpIntro = () => {
    storeData('intro', 'intro')
    this.setState({ isModalVisible: false })
  }

  _closeModal = () => {
    this.setState({ isCongratModalVisible: false })
  }

  _renderScreen = () => {
    const { isNetworkConnect } = this.state
    const { locationAccess } = this.props
    if (isNetworkConnect && locationAccess) {
      return <AppContainer />
    } else if (isNetworkConnect && !locationAccess) {
      return <LocationError />
    } else {
      return <ErrorScreen />
    }
  }

  render() {
    const { isCongratModalVisible } = this.state
    return (
      <MainView style={{ flex: 1 }}>
        {Platform.OS === 'android' ? (
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.6)"
            translucent
          />
        ) : null}
        {this._renderScreen()}
        <SafeAreaConsumer>
          {insets => {
            return <View style={{ paddingBottom: insets.bottom }} />
          }}
        </SafeAreaConsumer>
        {this.state.isModalVisible && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              height: STATUS_BAR_HEIGHT,
              width: SCREEN_WIDTH,
              backgroundColor: palette.primaryColor
            }}
          />
        )}
        <Modal
          deviceHeight={FULL_SCREEN_HEIGHT}
          isVisible={this.state.isModalVisible}
          animationIn="zoomInDown"
          animationInTiming={500}
          onSwipeComplete={this._swipeUpIntro}
          hasBackdrop={false}
          swipeDirection="up"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0
          }}
        >
          <IntroScreen />
        </Modal>
        <CongratModal
          isCongratModalVisible={isCongratModalVisible}
          closeModal={this._closeModal}
        />
      </MainView>
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
