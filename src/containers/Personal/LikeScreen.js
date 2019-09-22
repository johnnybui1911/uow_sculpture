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
    return <CardItem item={item} index={index} inProfile />
  }

  _renderList = () => {
    const { refreshing } = this.state
    const { markerMatrix } = this.props
    let likeList = []
    Object.entries(markerMatrix).forEach(([key, value]) => {
      value.likeId && likeList.push(value)
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
  markerMatrix: getState.markerReducer.markerMatrix
})

export default connect(mapStateToProps)(LikeScreen)
