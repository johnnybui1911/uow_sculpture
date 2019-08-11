import React from 'react'
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Text,
  Modal,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ImageViewer from 'react-native-image-zoom-viewer'
import { CustomIcon, icons } from '../../assets/icons'
import styles from './styles'
import images from '../../assets/images'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/dimension'

const localImages = [1, 2, 3]

const imageSlide = localImages.map(index => {
  return {
    url: '',
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH,
    props: {
      source: images.sculptures[index],
      resizeMode: 'cover'
    }
  }
})

class Header extends React.PureComponent {
  state = {
    modalVisible: false
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  render() {
    return (
      <View style={styles.headerImage}>
        <Modal visible={this.state.modalVisible} transparent>
          <ImageViewer
            renderHeader={() => (
              <TouchableWithoutFeedback
                onPress={() => this.setModalVisible(false)}
              >
                <View style={styles.closeButton}>{icons.close_w}</View>
              </TouchableWithoutFeedback>
            )}
            enableImageZoom
            imageUrls={imageSlide}
          />
        </Modal>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {localImages.map(index => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.setModalVisible(true)}
              >
                <View>
                  <Image
                    source={images.sculptures[index]}
                    resizeMode="cover"
                    style={styles.imageItem}
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </ScrollView>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.goBack()}
        >
          <View
            style={{
              position: 'absolute',
              top: 56 - 24,
              padding: 24,
              borderRadius: 50
            }}
          >
            <CustomIcon name="back" size={24} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 1)']}
          style={styles.overlayImage}
        >
          <View>
            <Text style={styles.visitorsText}>100 visitors</Text>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default Header
