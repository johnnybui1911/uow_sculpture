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
  state = {
    likeList: []
  }

  componentDidMount = () => {
    const { likeList } = this.props
    this.setState({
      likeList: likeList.sort((a, b) => {
        return new Date(b.likedTime).getTime() - new Date(a.likedTime).getTime()
      })
    })
  }

  _renderItem = ({ item, index }) => {
    return <CardItem id={item.sculptureId} index={index} />
  }

  _renderList = () => {
    const { likeList } = this.state
    return (
      <Animated.FlatList
        data={likeList}
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
