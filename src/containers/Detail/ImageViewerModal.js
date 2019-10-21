/**
 * Description: Image Viewer Component
 * Author: Nam Bui
 **/

import React from 'react'
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  Platform,
  StatusBar
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import styles from './styles'
import { icons } from '../../assets/icons'
import { useSafeArea } from 'react-native-safe-area-view'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

const ImageViewerModal = ({
  imageSlide,
  modalVisible,
  setModalVisible,
  currentIndex,
  setCurrentIndex
}) => {
  const insets = useSafeArea()
  const closeModal = () => {
    setModalVisible(false)
    Platform.OS === 'ios' && StatusBar.setHidden(false)
  }
  return (
    <View style={{ ...styles.blackFullscreen, zIndex: modalVisible ? 1 : -10 }}>
      <Modal visible={modalVisible} transparent>
        <ImageViewer
          renderIndicator={(currentIndex, allSize) => (
            <View
              style={{
                position: 'absolute',
                top:
                  Platform.OS === 'ios' && insets.top > 20
                    ? STATUS_BAR_HEIGHT
                    : 0,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                zIndex: 1
              }}
            >
              <View style={{ left: 0, right: 0, position: 'absolute' }}>
                <Text
                  style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}
                >
                  {`${currentIndex} / ${allSize}`}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end'
                }}
              >
                <TouchableWithoutFeedback onPress={closeModal}>
                  <View
                    style={{
                      padding: 24
                    }}
                  >
                    {icons.close_w}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
          enableImageZoom
          enableSwipeDown
          onCancel={closeModal}
          // saveToLocalByLongPress
          // onSave={url => console.log(`Save photo url: ${url}`)}
          // menuContext={{ saveToLocal: 'Save photo', cancel: 'Cancel' }}
          imageUrls={imageSlide}
          index={currentIndex}
          onChange={index => {
            setCurrentIndex(index)
          }}
        />
      </Modal>
    </View>
  )
}

export default ImageViewerModal
