import React from 'react'
import {
  View,
  FlatList,
  RefreshControl,
  TextInput,
  Platform,
  ActivityIndicator
} from 'react-native'
import styles from './styles'
import palette from '../../assets/palette'
import CommentItem from './CommentItem'
import NoResultScreen from '../../components/NoResult/NoResultScreen'
import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../assets/dimension'

class CommentList extends React.PureComponent {
  state = {
    onEndReachedCalledDuringMomentum: false
  }

  // _handleLoadMore = () => {
  //   // console.log('End Reached')
  // }

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
    const { comments, refreshing, _handleRefresh, isLoading } = this.props
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
        // keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        refreshControl={
          <RefreshControl
            colors={[palette.primaryColorLight]}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            tintColor={palette.primaryColorLight}
          />
        }
        contentContainerStyle={{
          // flex: 1,
          paddingTop: 12,
          paddingHorizontal: 24,
          paddingBottom: Platform.OS === 'android' ? 60 + 54 : 60 + 24
        }}
        ListHeaderComponentStyle={{ marginHorizontal: -24 }}
        onEndReachedThreshold={0.001}
        onEndReached={() => {
          if (!this.state.onEndReachedCalledDuringMomentum) {
            this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
              this.props._handleLoadMore()
            })
          }
        }}
        ListFooterComponent={this.renderFooter}
        onMomentumScrollBegin={() => {
          this.setState({ onEndReachedCalledDuringMomentum: false })
        }}
        initialNumToRender={10}
      />
    )
  }

  renderFooter = () => {
    return !this.props.isLoading ? null : (
      <View
        style={{
          paddingVertical: 6
        }}
      >
        <ActivityIndicator color={palette.primaryColorLight} size="large" />
      </View>
    )
  }

  render() {
    const { comments, isLoading, _rejectEditComment } = this.props
    return !comments.length && !isLoading ? (
      <NoResultScreen title="No comments" />
    ) : (
      <View
        onStartShouldSetResponderCapture={e => {
          const focusField = TextInput.State.currentlyFocusedField()
          if (focusField != null && e.nativeEvent.target != focusField) {
            // _rejectEditComment()
            TextInput.State.blurTextInput(
              TextInput.State.currentlyFocusedField()
            )
          }
        }}
        style={{ flex: 1 }}
      >
        {this._renderList()}
      </View>
    )
  }
}

export default CommentList
