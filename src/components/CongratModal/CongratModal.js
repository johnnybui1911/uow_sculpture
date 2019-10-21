/**
 * Description: Congratulation Modal (When enter the Sculpture Region)
 * Author: Nam Bui
 **/

import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { FULL_SCREEN_HEIGHT } from '../../assets/dimension'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { CLOSE_MODAL } from '../../assets/actionTypes'
import images from '../../assets/images'

const CongratModal = ({
  isCongratModalVisible,
  _closeModal,
  enteredMarkers
}) => {
  return (
    <View>
      <Modal
        deviceHeight={FULL_SCREEN_HEIGHT}
        isVisible={isCongratModalVisible}
        animationIn="zoomInDown"
        animationInTiming={1000}
        onSwipeComplete={() => _closeModal()}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackdropPress={() => {
          _closeModal()
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0
        }}
      >
        <View
          style={{
            zIndex: 900,
            backgroundColor: '#fff',
            borderRadius: 26,
            minHeight: 280,
            minWidth: 300,
            maxWidth: 320,
            justifyContent: 'center',
            alignItems: 'center'
            // elevation: 10
          }}
        >
          <View style={{ position: 'absolute', top: -55 }}>{icons.trophy}</View>
          <View
            style={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={[styles.title, { fontSize: 20 }]}>
              Congratulations!
            </Text>
            <Text
              style={[
                styles.title_sm,
                {
                  fontFamily: 'Montserrat-Medium'
                }
              ]}
            >
              You have visited
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            {enteredMarkers.slice(0, 2).map(item => {
              const { photoURL, id, name } = item
              return (
                <View
                  key={id}
                  style={{
                    backgroundColor: palette.backgroundColorWhite,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5
                    // minHeight: 80
                  }}
                >
                  {photoURL ? (
                    <Image
                      source={{ uri: photoURL }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 4,
                        backgroundColor: palette.backgroundTabColor
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 4,
                        backgroundColor: palette.backgroundTabColor,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        source={images.empty_image}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 4
                        }}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      // paddingBottom: 7,
                      paddingTop: 3,
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={[
                        styles.title_sm,
                        {
                          color: palette.primaryColor,
                          textAlign: 'center'
                        }
                      ]}
                    >
                      {name}
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const mapStateToProps = getState => ({
  isCongratModalVisible: getState.modalReducer.isCongratModalVisible,
  enteredMarkers: getState.modalReducer.enteredMarkers,
  markerMatrix: getState.markerReducer.markerMatrix
})

const mapDispatchToProps = dispatch => ({
  _closeModal: () => {
    dispatch({ type: CLOSE_MODAL })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongratModal)
