import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import styles from './styles'
import images from '../../assets/images'
import DividerLight from '../../components/Divider/DividerLight'
import { MIN_TABVIEW_HEIGHT } from '../../assets/dimension'
import palette from '../../assets/palette'

const localComments = [
  {
    text: 'Hello',
    submitDate: new Date(2019, 5, 24, 10, 33, 30),
    photoURL: 1
  },
  {
    text:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    submitDate: new Date(2019, 5, 29, 10, 33, 30),
    photoURL: 2
  },
  {
    text:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    submitDate: new Date(2019, 5, 29, 10, 33, 30),
    photoURL: 3
  },
  {
    text:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    submitDate: new Date(2019, 5, 29, 10, 33, 30),
    photoURL: 4
  },
  { text: 'Hello', submitDate: new Date(), photoURL: 1 }
]

class CommentScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      loading: true,
      refreshing: false
    }
  }

  componentDidMount = () => {
    this._fetchData()
  }

  _fetchData = () => {
    localComments.sort((a, b) => {
      return b.submitDate - a.submitDate
    })

    this.setState({
      comments: localComments,
      refreshing: false,
      loading: false
    })
  }

  _renderItem = ({ item }) => {
    const { markerMatrix, username } = this.props
    const { sculptureId, text, submitDate, userId, photoURL } = item
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <View style={[]}>
          <Image
            source={photoURL ? { uri: photoURL } : images.empty_image}
            style={{
              width: 60,
              height: 60,
              borderRadius: 4,
              backgroundColor: palette.backgroundTabColor
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 12
          }}
        >
          <Text style={[styles.title, { fontSize: 14 }]}>{username}</Text>
          <Text
            style={[
              styles.description_cmt,
              { marginBottom: 3, fontSize: 14, opacity: 0.9 }
            ]}
          >
            {text}
          </Text>
          <Text
            style={[
              styles.description,
              { fontSize: 13, color: 'rgb(136,136,136)' }
            ]}
          >
            {moment(submitDate).fromNow()}
          </Text>
        </View>
      </View>
    )
  }

  _renderList = () => {
    const { refreshing } = this.state
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
          <DividerLight style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
        )}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
        contentContainerStyle={{ padding: 24 }}
      />
    )
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () =>
        this.setState({
          refreshing: false
        })
    )
  }

  render() {
    const { loading } = this.state
    return <View style={{ flex: 1 }}>{this._renderList()}</View>
  }
}

const mapStateToProps = getState => ({
  commentList: getState.authReducer.commentList,
  markerMatrix: getState.markerReducer.markerMatrix,
  username: getState.authReducer.user.username
})

export default connect(mapStateToProps)(CommentScreen)
