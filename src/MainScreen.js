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
import { STATUS_BAR_HEIGHT } from './assets/dimension'
import { AppContainer } from './navigations/AppStack'
import IntroScreen from './containers/Introduction/IntroScreen'
import palette from './assets/palette'
import { icons } from './assets/icons'
import CongratModal from './components/CongratModal/CongratModal'
import { storeData, getData, clearData } from './library/asyncStorage'

// TODO: just swipe up, not swipe down
clearData('intro')
class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: true,
      isCongratModalVisible: false
    }
  }

  // componentDidMount = async () => {
  //   try {
  //     const intro = await getData('intro')
  //     if (intro) {
  //       this.setState({ isModalVisible: false })
  //     } else {
  //       this.setState({ isModalVisible: true })
  //     }
  //   } catch (e) {
  //     this.setState({ isModalVisible: true })
  //   }
  // }

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
          animationIn="zoomInDown"
          // animationInTiming={500}
          onSwipeComplete={() => {
            // storeData('intro', 'intro')
            this.setState({ isModalVisible: false })
          }}
          swipeDirection="up"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0
          }}
        >
          <View style={{ flex: 1, zIndex: 900, elevation: 10 }}>
            <IntroScreen />
          </View>
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
