import React from 'react'
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import styles from './styles'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/dimension'
import ImageViewerModal from './ImageViewerModal'
import ImageOverlay from '../../components/ImageOverlay.js/ImageOverlay'
import BackButton from '../../components/BackButton/BackButton'
import images from '../../assets/images'

const activeDot = <View style={activeDot} />

class Header extends React.PureComponent {
  state = {
    modalVisible: false,
    currentIndex: 0
  }

  swiper = null

  _onMomentumScrollEnd = (e, state) => {
    this.setState({ currentIndex: state.index })
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  setCurrentIndex = targetIndex => {
    const crrIndex = this.swiper.state.index
    const offset = targetIndex - crrIndex // offset to scroll to current index
    this.swiper.scrollBy(offset)
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const id = this.props.navigation.getParam('id', 2015.003)
    const item = this.props.markerMatrix[id]
    const { imageList } = item
    const imageSlide = imageList.map(item => {
      return {
        url: item.url,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        props: {
          resizeMode: 'contain'
        }
      }
    })
    const { modalVisible, currentIndex } = this.state
    return (
      <View style={styles.headerImage}>
        {imageList.length > 0 ? (
          <View>
            <ImageViewerModal
              modalVisible={modalVisible}
              imageSlide={imageSlide}
              setModalVisible={this.setModalVisible}
              currentIndex={currentIndex}
              setCurrentIndex={this.setCurrentIndex}
            />
            <Swiper
              height="100%"
              activeDotColor="#fff"
              dotColor="rgba(185,185,185,.2)"
              paginationStyle={{ bottom: 7 }}
              ref={component => (this.swiper = component)}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
            >
              {imageList.map(image => {
                return (
                  <TouchableWithoutFeedback
                    key={image.id}
                    onPress={() => this.setModalVisible(true)}
                  >
                    <View>
                      <Image
                        source={{ uri: image.url }}
                        resizeMode="cover"
                        style={styles.imageItem}
                      />
                      <ImageOverlay />
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </Swiper>
            <View style={styles.overlayImage}>
              <View>
                <Text style={styles.visitorsText}>100 visitors</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.imageItem]}>
            <Image
              source={images.empty_image}
              style={{ width: 120, height: 75, backgroundColor: '#F6F6F6' }}
              resizeMode="contain"
            />
          </View>
        )}

        <BackButton
          _goBack={this._goBack}
          style={
            imageList.length > 0
              ? { color: 'white' }
              : { color: '#3A3A3A', opacity: 0.7 }
          }
        />
      </View>
    )
  }
}
const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix
})

export default connect(mapStateToProps)(withNavigation(Header))
