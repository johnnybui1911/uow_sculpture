import React from 'react'
import { SafeAreaView, View, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { localData } from '../../library/localData'
import CardItem from './CardItem'
import palette from '../../assets/palette'
// import CardItem from './CardItem'

class LikeScreen extends React.PureComponent {
  state = {
    refreshing: false
  }

  _renderItem = ({ item, index }) => {
    return <CardItem id={item.sculptureId} index={index} />
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.setState({
          refreshing: false
        })
      }
    )
  }

  _renderList = () => {
    const { refreshing } = this.state
    const { likeList } = this.props
    // let likeList = []
    // Object.entries(markerMatrix).forEach(([key, value]) => {
    //   value.likeId && likeList.push(value)
    // })
    return (
      <FlatList
        data={likeList.sort((a, b) => {
          return (
            new Date(b.likedTime).getTime() - new Date(a.likedTime).getTime()
          )
        })}
        refreshControl={
          <RefreshControl
            colors={[palette.primaryColorLight]}
            refreshing={refreshing}
            onRefresh={this._handleRefresh}
            tintColor={palette.primaryColorLight}
          />
        }
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
