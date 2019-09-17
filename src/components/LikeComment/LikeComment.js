import React from 'react'
import { View, TouchableWithoutFeedback, Animated, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { icons } from '../../assets/icons'
import styles from './styles'
import { _like, _unlike } from '../../redux/actions'

class LikeComment extends React.PureComponent {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(1)
  }

  onPress = () => {
    const { markerId, statisticMatrix, _like, _unlike, loggedIn } = this.props
    const statItem = statisticMatrix[markerId]
    if (loggedIn) {
      if (statItem && !statItem.isLiked) {
        _like(markerId)
        this.animatedValue.setValue(1.4)
        Animated.spring(this.animatedValue, {
          toValue: 1,
          friction: 2
        }).start()
      } else {
        _unlike(markerId)
        this.animatedValue.setValue(1)
      }
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }
    const { markerId, statisticMatrix } = this.props
    const statItem = statisticMatrix[markerId]
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          flexDirection: 'row',
          paddingBottom: 5
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 55
          }}
        >
          <TouchableWithoutFeedback onPress={this.onPress}>
            <Animated.View style={[animatedStyle, { width: 20 }]}>
              {statItem && statItem.isLiked
                ? icons.like_fill
                : icons.like_outline}
            </Animated.View>
          </TouchableWithoutFeedback>
          <Text style={styles.numberStyle}>
            {statItem &&
              (statItem.isLiked ? statItem.likeCount + 1 : statItem.likeCount)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 55
          }}
        >
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('Comment', { id: markerId })
            }
          >
            <View style={{ width: 20 }}>{icons.comment}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.numberStyle}>
            {statItem && statItem.commentCount}
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = getState => ({
  distanceMatrix: getState.distanceReducer.distanceMatrix,
  statisticMatrix: getState.markerReducer.statisticMatrix,
  loggedIn: getState.authReducer.loggedIn
})

const mapDispatchToProps = {
  _like,
  _unlike
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LikeComment))
