import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import Divider from '../../components/Divider/Divider'
import { icons } from '../../assets/icons'
import styles from './styles'
import formatDistance from '../../library/formatDistance'
import LikeComment from '../../components/LikeComment/LikeComment'

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
    <View style={[cardStyle, { paddingBottom: 16, paddingTop: 16 }]}>
      {renderDistance()}
      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>
      <Divider />
      <LikeComment markerId={item.id} />
    </View>
  )
}

const mapStateToProps = getState => ({
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

export default connect(mapStateToProps)(TitleCard)
