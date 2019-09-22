/* eslint-disable react/sort-comp */
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../assets/icons'
import formatDistance from '../../library/formatDistance'
import images from '../../assets/images'
import { _like, _unlike } from '../../redux/actions'
import baseAxios from '../../library/api'

class NearbyItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  _handleUnlike = () => {
    const { item, _like, _unlike } = this.props
    const markerId = item.id
    const { likeId } = item
    console.log(likeId)
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

  _handleLike = () => {
    const { item, _like, _unlike } = this.props
    const markerId = item.id
    baseAxios
      .post('like', {
        sculptureId: markerId
      })
      .then(res => res.data)
      .then(resData => {
        const { likeId } = resData
        _like(markerId, likeId)
        Animated.sequence([
          Animated.spring(this.animatedValue, {
            toValue: 1,
            useNativeDriver: true
          }),
          Animated.spring(this.animatedValue, {
            toValue: 0,
            useNativeDriver: true
          })
        ]).start()
      })
      .catch(e => {
        console.log(e)
      })
  }

  onLikePress = () => {
    const { item, loggedIn, _like, _unlike } = this.props
    if (loggedIn) {
      if (!item.likeId) {
        this._handleLike()
      } else {
        this._handleUnlike()
      }
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  _renderOverlay = () => {
    const overlayHeartStyle = [
      styles.overlayHeart,
      {
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1.5]
            })
          }
        ]
      }
    ]

    return (
      <Animated.View style={overlayHeartStyle}>
        {icons.like_fill_popup}
      </Animated.View>
    )
  }

  render() {
    const { item, navigation, distanceMatrix } = this.props
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Detail', { id: item.id })}
      >
        <View style={styles.nearbyItemStyle}>
          <View style={styles.imageNearbyContainer}>
            {!item.photoURL ? (
              <Image
                source={images.empty_image}
                resizeMode="cover"
                style={[
                  styles.imageNearbyItem,
                  { width: 120, height: 75, backgroundColor: '#F6F6F6' }
                ]}
              />
            ) : (
              <Image
                source={{ uri: item.photoURL }}
                resizeMode="cover"
                style={styles.imageNearbyItem}
              />
            )}
            {this._renderOverlay()}
            <View style={styles.nearbyItemDetail}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <Text style={styles.title}>
                  {distanceMatrix && distanceMatrix[item.id]
                    ? formatDistance(distanceMatrix[item.id].distance)
                    : ''}
                </Text>

                <Text numberOfLines={2} style={styles.title}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center'
                }}
              >
                <TouchableWithoutFeedback onPress={this.onLikePress}>
                  <View style={[{ marginTop: 10, padding: 5 }]}>
                    {item.likeId ? icons.like_fill_white : icons.like}
                  </View>
                </TouchableWithoutFeedback>
                <Text style={[styles.like, { marginTop: 10 }]}>
                  {item.likeCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
)(withNavigation(NearbyItem))
