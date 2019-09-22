import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { CLOSE_MODAL } from '../../assets/actionTypes'
import animations from '../../assets/animations'
import images from '../../assets/images'

const CongratModal = ({
  isCongratModalVisible,
  _closeModal,
  enteredMarkers
}) => {
  const progressAnimation = new Animated.Value(0)
  const _animateCeleb = () => {
    progressAnimation.setValue(0)
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 5000
    }).start()
  }
  return (
    <View>
      {isCongratModalVisible && (
        <View
          style={{
            position: 'absolute',
            height: STATUS_BAR_HEIGHT,
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000000',
            zIndex: 100,
            opacity: 0.7
          }}
        />
      )}
      <Modal
        isVisible={isCongratModalVisible}
        animationIn="zoomInDown"
        animationInTiming={1000}
        // onSwipeComplete={() => closeModal()}
        // swipeDirection={['up', 'left', 'right', 'down']}
        onBackdropPress={() => {
          _closeModal()
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* <LottieView
                ref={animation => {
                  this.animation = animation
                }}
                style={{
                  zIndex: 99,
                  elevation: 20,
                  transform: [{ scale: (1.1, 1.4) }]
                }}
                source={animations.confetti}
                progress={this.progressAnimation}
              /> */}
        <View
          style={{
            zIndex: 900,
            backgroundColor: '#fff',
            borderRadius: 26,
            minHeight: 200,
            width: 240,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 10
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
          {/* <TouchableOpacity
            style={{
              height: 44,
              borderRadius: 26,
              width: 140,
              backgroundColor: palette.primaryColorLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              zIndex: 100
            }}
            // onPress={() => {
            //   this._navigateToDetail(this.props.selectedMarker)
            // }}
          >
            <Text style={styles.titleButton}>PROCEED</Text>
          </TouchableOpacity> */}
          <ScrollView horizontal>
            {enteredMarkers.map(item => {
              const { photoURL, id, name } = item
              return (
                <View
                  key={id}
                  style={{
                    padding: 12,
                    backgroundColor: palette.backgroundColorWhite,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 80
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
                      paddingBottom: 7,
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
          </ScrollView>
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
