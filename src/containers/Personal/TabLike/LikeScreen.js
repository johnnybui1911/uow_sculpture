import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  RefreshControl,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles'
import CardItem from './CardItem'

class LikeScreen extends React.PureComponent {
  _renderItem = ({ item, index }) => {
    return <CardItem id={item.sculptureId} index={index} />
  }

  _renderList = () => {
    const { likeList } = this.props
    return (
      <FlatList
        data={likeList.sort((a, b) => {
          return (
            new Date(b.likedTime).getTime() - new Date(a.likedTime).getTime()
          )
        })}
        keyExtractor={(item, index) => index.toString()}
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
  likeList: getState.authReducer.likeList
})

export default connect(mapStateToProps)(LikeScreen)
