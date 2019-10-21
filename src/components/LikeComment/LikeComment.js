/**
 * Description: Like and Comment Button Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, TouchableWithoutFeedback, Animated, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { icons } from '../../assets/icons'
import styles from './styles'
import { _like, _unlike } from '../../redux/actions'
import baseAxios from '../../library/api'
import { _setLikeId } from '../../redux/actions/markerActions'

class LikeComment extends React.PureComponent {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(1)
  }

  state = {
    isPending: false,
    isFill: null
  }

  componentDidMount = () => {
    this._fetchLikeId()
  }

  componentDidUpdate = () => {
    this._fetchLikeId()
  }

  _fetchLikeId = () => {
    const { markerId, markerMatrix, isLoadingUser } = this.props
    const { isFill } = this.state
    if (isLoadingUser && markerMatrix[markerId].likeId !== isFill) {
      this.setState({ isFill: markerMatrix[markerId].likeId })
    }
  }

  onCommentPress = () => {
    const { markerMatrix, markerId, _like, _unlike, loggedIn } = this.props
    // if (loggedIn) {
    //   this.props.navigation.navigate('Comment', { id: markerId })
    // } else {
    //   this.props.navigation.navigate('Comment', )
    // }

    this.props.navigation.navigate('Comment', { id: markerId })
  }

  onPress = () => {
    const { markerMatrix, markerId, _like, _unlike, loggedIn } = this.props
    const { isPending } = this.state
    if (loggedIn) {
      if (!markerMatrix[markerId].likeId) {
        if (!isPending) {
          this._handleLike()
        } else {
          console.log('is pending!!')
        }
      } else {
        if (!isPending) {
          console.log('pending: ', isPending)
          this._handleUnlike()
        } else {
          console.log('is pending!!')
        }
      }
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  _handleUnlike = () => {
    const { markerId, markerMatrix, _like, _unlike } = this.props
    const { likeId } = markerMatrix[markerId]
    this.setState({ isPending: true })
    // this.animatedValue.setValue(1)
    console.log(likeId)
    _unlike(markerId)

    baseAxios
      .delete(`like/${likeId}`)
      .then(() => {
        this.setState({ isPending: false })
      })
      .catch(e => {
        console.log(e.response.data.message)
        this.setState({ isPending: false })
      })
  }

  _handleLike = () => {
    const { markerId, _like, _unlike, _setLikeId } = this.props
    this.setState({ isPending: true })
    _like(markerId, 'temp')

    baseAxios
      .post('like', {
        sculptureId: markerId
      })
      .then(res => res.data)
      .then(resData => {
        const { likeId } = resData
        _setLikeId(markerId, likeId)
        this.setState({ isPending: false })
        // this.animatedValue.setValue(1.4)
        // Animated.spring(this.animatedValue, {
        //   toValue: 1,
        //   friction: 2
        // }).start()
      })
      .catch(e => {
        console.log(e.response.data.message)
        this.setState({ isPending: false })
      })
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }
    const { markerId, style, markerMatrix } = this.props
    const { isFill } = this.state
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
              {isFill ? icons.like_fill : icons.like_outline}
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
          <TouchableWithoutFeedback onPress={this.onCommentPress}>
            <View style={styles.socialIconStyle}>{icons.comment}</View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onCommentPress}>
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
  markerMatrix: getState.markerReducer.markerMatrix,
  isLoadingUser: getState.markerReducer.isLoadingUser
})

const mapDispatchToProps = {
  _like,
  _unlike,
  _setLikeId
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LikeComment))
