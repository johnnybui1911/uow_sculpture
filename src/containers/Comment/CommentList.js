import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import styles from './styles'
import palette from '../../assets/palette'
import CommentItem from './CommentItem'

class CommentList extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  _handleLoadMore = () => {
    // console.log('End Reached')
  }

  _renderItem = ({ item }) => {
    const { _openModal, _selectComment, _handleEditComment } = this.props
    return (
      <CommentItem
        item={item}
        _openModal={_openModal}
        _selectComment={_selectComment}
        _handleEditComment={_handleEditComment}
      />
    )
  }

  _renderList = () => {
    const { comments, refreshing, _handleRefresh } = this.props
    return (
      <FlatList
        ref={scroll => (this.flatCommentList = scroll)}
        data={comments.sort((a, b) => {
          return (
            new Date(b.submitDate).getTime() - new Date(a.submitDate).getTime()
          )
        })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        refreshControl={
          <RefreshControl
            colors={[palette.primaryColorLight]}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 60 + 16
        }}
        ListHeaderComponentStyle={{ marginHorizontal: -24 }}
        onEndReachedThreshold={0.5}
        onEndReached={this._handleLoadMore}
      />
    )
  }

  render() {
    return <View style={{ flex: 1 }}>{this._renderList()}</View>
  }
}

export default CommentList
