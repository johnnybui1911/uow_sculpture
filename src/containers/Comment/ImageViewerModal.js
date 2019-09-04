import React from 'react'
import { View, Modal, TouchableWithoutFeedback, Text } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import styles from './styles'
import { icons } from '../../assets/icons'

const ImageViewerModal = ({
  imageSlide,
  modalVisible,
  setModalVisible,
  currentIndex,
  setCurrentIndex
}) => {
  return (
    <View style={{ ...styles.blackFullscreen, zIndex: modalVisible ? 1 : -10 }}>
      <Modal visible={modalVisible} transparent>
        <ImageViewer
          renderIndicator={(currentIndex, allSize) => (
            <View
              style={{
                position: 'absolute',
                top: 0,
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
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
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
          onCancel={() => setModalVisible(false)}
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
