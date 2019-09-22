import React from 'react'
import { View, TouchableWithoutFeedback, Animated, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { icons } from '../../assets/icons'
import styles from './styles'
import { _like, _unlike } from '../../redux/actions'
import baseAxios from '../../library/api'

class LikeComment extends React.PureComponent {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(1)
  }

  onPress = () => {
    const { markerMatrix, markerId, _like, _unlike, loggedIn } = this.props
    if (loggedIn) {
      if (!markerMatrix[markerId].likeId) {
        this._handleLike()
      } else {
        this._handleUnlike()
      }
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  _handleUnlike = () => {
    const { markerId, markerMatrix, _like, _unlike } = this.props
    const { likeId } = markerMatrix[markerId]
    // this.animatedValue.setValue(1)
    if (likeId === 'temp') {
      _unlike(markerId)
    } else {
      if (likeId) {
        baseAxios
          .delete(`like/${likeId}`)
          .then(res => {
            _unlike(markerId)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }

  _handleLike = () => {
    const { markerId, _like, _unlike } = this.props
    // _like(markerId, 'temp')

    baseAxios
      .post('like', {
        sculptureId: markerId
      })
      .then(res => res.data)
      .then(resData => {
        const { likeId } = resData
        _like(markerId, likeId)
        // this.animatedValue.setValue(1.4)
        // Animated.spring(this.animatedValue, {
        //   toValue: 1,
        //   friction: 2
        // }).start()
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }
    const { markerId, style, markerMatrix } = this.props
    return (
      <View
        style={{
          ...style,
          flex: 1,
          alignItems: 'flex-end',
          flexDirection: 'row'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <TouchableWithoutFeedback onPress={this.onPress}>
            <Animated.View style={[animatedStyle, styles.socialIconStyle]}>
              {markerMatrix[markerId].likeId
                ? icons.like_fill
                : icons.like_outline}
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onPress}>
            <Text style={[styles.numberStyle, styles.likeNumberSpecial]}>
              {markerMatrix[markerId].likeCount}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
            // width: 55
          }}
        >
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('Comment', { id: markerId })
            }
          >
            <View style={styles.socialIconStyle}>{icons.comment}</View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('Comment', { id: markerId })
            }
          >
            <Text style={[styles.numberStyle]}>
              {markerMatrix[markerId].commentCount}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const mapStateToProps = getState => ({
  distanceMatrix: getState.distanceReducer.distanceMatrix,
  loggedIn: getState.authReducer.loggedIn,
  markerMatrix: getState.markerReducer.markerMatrix
})

const mapDispatchToProps = {
  _like,
  _unlike
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LikeComment))
