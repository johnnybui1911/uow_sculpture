/**
 * Description: Detail Header Component (IOS Platform)
 * Author: Nam Bui
 **/

import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  ScrollView,
  StatusBar
} from 'react-native'
import styles from './styles'
import images from '../../assets/images'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/dimension'
import ImageViewerModal from './ImageViewerModal'
import ImageOverlay from '../../components/ImageOverlay.js/ImageOverlay'
import BackButton from '../../components/BackButton/BackButton'

class Header extends React.PureComponent {
  state = {
    currentIndex: 0,
    imageList: [],
    initialImageList: [],
    imageLoading: true
  }

  componentDidMount = () => {
    const { imageList } = this.props
    this.setState({ imageList, initialImageList: imageList })
  }

  scrollRef = null

  setCurrentIndex = targetIndex => {
    this.scrollRef.scrollTo({ x: (targetIndex + 1) * SCREEN_WIDTH })
    this.setState({ currentIndex: targetIndex })
  }

  setSelectedImage = event => {
    const { initialImageList } = this.state
    const viewSize = event.nativeEvent.layoutMeasurement.width
    const contentOffset = event.nativeEvent.contentOffset.x
    const selectedIndex = Math.floor(contentOffset / viewSize) - 1
    if (selectedIndex === initialImageList.length) {
      const firstImage = initialImageList[0]
      this.setState({
        imageList: [...initialImageList, firstImage],
        currentIndex: 0
      })
    } else if (selectedIndex === -1) {
      this.scrollRef.scrollTo({
        x: initialImageList.length * SCREEN_WIDTH,
        animated: false
      })
      this.setState({ currentIndex: initialImageList.length - 1 })
    } else {
      this.setState({ currentIndex: selectedIndex })
    }
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const {
      item: { visitCount }
    } = this.props
    const { imageList, initialImageList } = this.state
    const imageSlide = imageList.map(item => {
      return {
        url: item.url,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH * 0.95,
        props: {
          resizeMode: 'contain'
        }
      }
    })
    const { currentIndex } = this.state
    const { modalVisible, setModalVisible } = this.props
    return (
      <View style={styles.headerImage}>
        {imageList.length > 0 ? (
          <View>
            <ImageViewerModal
              modalVisible={modalVisible}
              imageSlide={imageSlide}
              setModalVisible={setModalVisible}
              currentIndex={currentIndex}
              setCurrentIndex={this.setCurrentIndex}
            />

            <View style={{ width: '100%' }}>
              {imageList.length === 1 ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setModalVisible(true)
                    StatusBar.setHidden(true)
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: imageList[0].url, cache: 'force-cache' }}
                      resizeMode="cover"
                      style={styles.imageItem}
                      onLoadEnd={() => {
                        this.setState({ imageLoading: false })
                      }}
                    />
                    {!this.state.imageLoading && <ImageOverlay />}
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <ScrollView
                  ref={ref => (this.scrollRef = ref)}
                  horizontal
                  pagingEnabled
                  onMomentumScrollEnd={this.setSelectedImage}
                  showsHorizontalScrollIndicator={false}
                  onContentSizeChange={() => {
                    this.scrollRef.scrollTo({
                      x: SCREEN_WIDTH,
                      animated: false
                    })
                    this.setState({ imageList: initialImageList })
                  }}
                >
                  {[
                    imageList[imageList.length - 1],
                    ...imageList,
                    imageList[0]
                  ].map((image, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                          setModalVisible(true)
                          StatusBar.setHidden(true)
                        }}
                      >
                        <View>
                          <Image
                            source={{ uri: image.url, cache: 'force-cache' }}
                            resizeMode="cover"
                            style={styles.imageItem}
                            onLoadEnd={() => {
                              if (index === 1) {
                                this.setState({ imageLoading: false })
                              }
                            }}
                          />
                          {!this.state.imageLoading && <ImageOverlay />}
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })}
                </ScrollView>
              )}

              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 7,
                  height: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {initialImageList.length !== 1 &&
                  initialImageList.map((image, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 3,
                          marginHorizontal: 2,
                          backgroundColor: '#FFF',
                          opacity: index === currentIndex ? 1 : 0.5
                        }}
                      />
                    )
                  })}
              </View>
            </View>
            <View style={styles.overlayImage}>
              <View>
                <Text style={styles.visitorsText}>
                  {visitCount} {visitCount > 1 ? 'visitors' : 'visitor'}
                </Text>
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

export default Header
