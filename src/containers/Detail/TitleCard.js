import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import Divider from '../../components/Divider/Divider'
import { icons } from '../../assets/icons'
import styles from './styles'
import LikeButton from '../Collection/LikeButton'
import formatDistance from '../../library/formatDistance'

const TitleCard = props => {
  const { item, elevation, _navigateToComment, distanceMatrix } = props
  const cardStyle = [styles.card, { elevation, marginTop: 0 }]
  const renderDistance = () => {
    if (item.coordinate.latitude) {
      return (
        <Text style={styles.distance}>
          {distanceMatrix[item.id]
            ? formatDistance(distanceMatrix[item.id].distance)
            : ''}
        </Text>
      )
    }
    return null
  }
  return (
    <View style={cardStyle}>
      {renderDistance()}
      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>
      <Divider />
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          flexDirection: 'row'
        }}
      >
        <LikeButton />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -5
          }}
        >
          <TouchableWithoutFeedback onPress={() => _navigateToComment()}>
            <View style={{ padding: 5 }}>{icons.comment}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.numberStyle}>2</Text>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = getState => ({
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

export default connect(mapStateToProps)(TitleCard)
