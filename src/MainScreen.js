import React from 'react'
import {
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native'
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
  SCREEN_WIDTH
} from './assets/dimension'
import { AppContainer } from './navigations/AppStack'
import IntroScreen from './containers/Introduction/IntroScreen'
import palette from './assets/palette'
import { icons } from './assets/icons'
import CongratModal from './components/CongratModal/CongratModal'
import { storeData, getData, clearData } from './library/asyncStorage'

// clearData('intro')
class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      isCongratModalVisible: false
    }
  }

  componentDidMount = async () => {
    const intro = await getData('intro')
    this.setState({ isModalVisible: intro ? false : true })
  }

  _swipeUpIntro = () => {
    storeData('intro', 'intro')
    this.setState({ isModalVisible: false })
  }

  _closeModal = () => {
    this.setState({ isCongratModalVisible: false })
  }

  render() {
    const { isCongratModalVisible } = this.state
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
          deviceHeight={SCREEN_HEIGHT}
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
