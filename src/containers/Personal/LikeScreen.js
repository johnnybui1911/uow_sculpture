import React from 'react'
import { SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { localData } from '../../library/localData'
import CardItem from '../Collection/CardItem'
// import CardItem from './CardItem'

class LikeScreen extends React.PureComponent {
  state = {
    refreshing: false
  }

  _renderItem = ({ item, index }) => {
    const { markerMatrix } = this.props
    const sculptureItem = markerMatrix[item.id]
    return <CardItem item={sculptureItem} index={index} inProfile />
  }

  _renderList = () => {
    const { refreshing } = this.state
    const { statisticMatrix } = this.props
    let likeList = []
    Object.entries(statisticMatrix).forEach(([key, value]) => {
      value.isLiked && likeList.push(value)
    })
    return (
      <FlatList
        data={likeList}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      />
    )
  }

  render() {
    return this._renderList()
  }
}

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix,
  statisticMatrix: getState.markerReducer.statisticMatrix
})

export default connect(mapStateToProps)(LikeScreen)
