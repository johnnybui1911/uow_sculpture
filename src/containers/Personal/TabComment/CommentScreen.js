import React from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles'
import DividerLight from '../../../components/Divider/DividerLight'
import Comment from './Comment'

class CommentScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderItem = ({ item }) => {
    const { markerMatrix } = this.props
    const { sculptureId } = item
    const marker = markerMatrix[sculptureId]
    const commentItem = { ...item, photoURL: marker.photoURL }
    return <Comment item={commentItem} />
  }

  _renderList = () => {
    const { commentList } = this.props
    return (
      <FlatList
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
          <DividerLight
            style={{ backgroundColor: 'rgba(0,0,0,0.15)', marginVertical: 0 }}
          />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    )
  }

  render() {
    // console.log(this.props.commentList)
    return <View style={{ flex: 1 }}>{this._renderList()}</View>
  }
}

const mapStateToProps = getState => ({
  commentList: getState.authReducer.commentList,
  markerMatrix: getState.markerReducer.markerMatrix,
  username: getState.authReducer.user.username
})

export default connect(mapStateToProps)(CommentScreen)
