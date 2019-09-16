import React from 'react'
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native'
import Swiper from 'react-native-swiper'
import { CustomIcon } from '../../assets/icons'
import styles from './styles'
import images from '../../assets/images'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/dimension'
import ImageViewerModal from './ImageViewerModal'
import ImageOverlay from '../../components/ImageOverlay.js/ImageOverlay'
import BackButton from '../../components/BackButton/BackButton'

const activeDot = <View style={activeDot} />

class Header extends React.PureComponent {
  state = {
    modalVisible: false,
    currentIndex: 0
  }

  swiper = null

  _onMomentumScrollEnd = (e, state, context) => {
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
    const { imageList } = this.props
    const imageSlide = imageList.map(item => {
      return {
        url: item.url,
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH,
        props: {
          resizeMode: 'cover'
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
          <View style={styles.imageItem}>
            <Image
              source={images.empty_image}
              style={{ width: 84, height: 84 }}
              resizeMode="cover"
            />
          </View>
        )}

        <BackButton _goBack={this._goBack} />
      </View>
    )
  }
}

export default Header
