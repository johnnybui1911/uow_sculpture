import React from 'react'
import { View, Animated } from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles'
import DividerLight from '../../../components/Divider/DividerLight'
import Comment from './Comment'

class CommentList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderItem = ({ item }) => {
    return <Comment item={item} />
  }

  _renderList = () => {
    const { commentList } = this.props
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
        data={commentList.sort((a, b) => {
          return (
            new Date(b.submitDate).getTime() - new Date(a.submitDate).getTime()
          )
        })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <DividerLight style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
        )}
        // contentContainerStyle={{ padding: 24 }}
      />
    )
  }

  render() {
    return <View style={{ flex: 1 }}>{this._renderList()}</View>
  }
}

const mapStateToProps = getState => ({
  commentList: getState.authReducer.commentList,
  markerMatrix: getState.markerReducer.markerMatrix,
  username: getState.authReducer.user.username
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(CommentList)
