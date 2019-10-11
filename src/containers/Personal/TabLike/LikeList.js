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

class LikeList extends React.PureComponent {
  state = {
    likeList: []
  }

  componentDidMount = () => {
    const { likeList } = this.props
    this.setState({
      likeList: likeList
        .sort((a, b) => {
          return (
            new Date(b.likedTime).getTime() - new Date(a.likedTime).getTime()
          )
        })
        .slice(0, 1)
    })
  }

  _renderItem = ({ item, index }) => {
    return <CardItem id={item.sculptureId} index={index} />
  }

  _renderList = () => {
    const { likeList } = this.state
    const {
      forwardRef,
      scrollEventThrottle,
      showsVerticalScrollIndicator,
      contentContainerStyle,
      onScroll
    } = this.props
    const scrollAnimationProps = {
      ref: forwardRef,
      scrollEventThrottle,
      showsVerticalScrollIndicator,
      contentContainerStyle,
      onScroll
    }

    return (
      <Animated.FlatList
        {...scrollAnimationProps}
        data={likeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
        onEndReached={() => {
          console.log('trigger')
          this.setState({
            likeList: [
              ...this.state.likeList,
              ...this.props.likeList.slice(likeList.length, 5)
            ]
          })
        }}
        onEndReachedThreshold={0.5}
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

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(LikeList)
