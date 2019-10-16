import React from 'react'
import {
  View,
  FlatList,
  RefreshControl,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import palette from '../../assets/palette'
import CommentItem from './CommentItem'
import NoResultScreen from '../../components/NoResult/NoResultScreen'
import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../assets/dimension'
import { DividerLight, Divider } from '../../components'

class CommentList extends React.PureComponent {
  state = {
    onEndReachedCalledDuringMomentum: false
  }

  // _handleLoadMore = () => {
  //   // console.log('End Reached')
  // }

  _renderItem = ({ item }) => {
    const {
      _openModal,
      _selectComment,
      _handleEditComment,
      isLoading,
      editing
    } = this.props
    return (
      <CommentItem
        item={item}
        _openModal={_openModal}
        _selectComment={_selectComment}
        _handleEditComment={_handleEditComment}
        isLoading={isLoading}
        editing={editing}
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
        ListHeaderComponent={this.renderHeader}
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

  renderHeader = () => {
    const { user, _focusTextInput, loggedIn, comments, isLoading } = this.props
    const isEmpty = !comments.length && !isLoading
    return Platform.OS === 'ios' ? null : (
      <View style={{}}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: loggedIn ? 10 : 20
          }}
        >
          <Text style={[styles.title, { fontSize: 16 }]}>Comments</Text>
        </View>
        {loggedIn && (
          <View
            style={{
              width: SCREEN_WIDTH,
              backgroundColor: palette.backgroundColorWhite,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24
            }}
          >
            <Image
              source={{ uri: user.picture }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                alignSelf: 'flex-end',
                backgroundColor: '#F6F6F6'
              }}
            />
            <TouchableWithoutFeedback onPress={_focusTextInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginVertical: 10,
                  marginLeft: 12,
                  height: 40,
                  backgroundColor: '#F2F3F5',
                  borderRadius: 16,
                  borderColor: 'rgba(0,0,0,0)'
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    padding: 10,
                    width: '100%',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 14,
                    color: 'rgb(110, 117, 125)'
                  }}
                >
                  Add a comment...
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
        {loggedIn && <Divider style={{ marginVertical: 10 }} />}
        {isEmpty && <NoResultScreen title="No comments" />}
      </View>
    )
  }

  renderFooter = () => {
    return !this.props.isLoading ? null : (
      <View
        style={{
          paddingVertical: 6
        }}
      >
        <ActivityIndicator color={palette.primaryColorLight} size="small" />
      </View>
    )
  }

  render() {
    const { comments, isLoading } = this.props
    return !comments.length && !isLoading && Platform.OS === 'ios' ? (
      <NoResultScreen title="No comments" />
    ) : (
      <View
        onStartShouldSetResponderCapture={e => {
          const focusField = TextInput.State.currentlyFocusedField()
          if (focusField != null && e.nativeEvent.target != focusField) {
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

const mapStateToProps = getState => ({
  user: getState.authReducer.user
})

export default connect(mapStateToProps)(CommentList)
