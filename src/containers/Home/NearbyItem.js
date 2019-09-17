import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../assets/icons'
import formatDistance from '../../library/formatDistance'
import images from '../../assets/images'
import { _like, _unlike } from '../../redux/actions'

class NearbyItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  _handleLike = () => {
    const {
      item: { id },
      _like
    } = this.props

    this.props._like(id)

    //TODO: Send POST to backend
  }

  _handleUnlike = () => {
    const {
      item: { id },
      _like
    } = this.props

    this.props._unlike(id)

    //TODO: Send POST to backend
  }

  onLikePress = () => {
    const { item, statisticMatrix } = this.props

    const statItem = statisticMatrix[item.id]
    if (statItem && !statItem.isLiked) {
      this._handleLike()
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
    } else {
      this._handleUnlike()
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
    const { item, navigation, distanceMatrix, statisticMatrix } = this.props
    const statItem = statisticMatrix[item.id]
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Detail', { id: item.id })}
      >
        <View style={styles.nearbyItemStyle}>
          <View style={styles.imageNearbyContainer}>
            {!item.photoURL ? (
              <Image
                source={images.empty_image}
                resizeMode="contain"
                style={[styles.imageNearbyItem, { width: 84, height: 84 }]}
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
                {distanceMatrix[item.id] ? (
                  <Text style={styles.title}>
                    {formatDistance(distanceMatrix[item.id].distance)}
                  </Text>
                ) : null}

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
                    {statItem && statItem.isLiked
                      ? icons.like_fill_white
                      : icons.like}
                  </View>
                </TouchableWithoutFeedback>
                <Text style={[styles.like, { marginTop: 10 }]}>
                  {statItem &&
                    (statItem.isLiked
                      ? statisticMatrix[item.id].likeCount + 1
                      : statisticMatrix[item.id].likeCount)}
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
  statisticMatrix: getState.markerReducer.statisticMatrix
})

const mapDispatchToProps = {
  _like,
  _unlike
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearbyItem)
