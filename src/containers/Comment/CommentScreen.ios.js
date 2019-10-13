import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  Animated,
  BackHandler,
  TouchableHighlight
} from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import styles from './styles'
import { _handleNotification } from '../../library/notificationTask'
import CommentList from './CommentList'
import {
  addComment,
  deleteComment,
  editComment
} from '../../redux/actions/authActions'
import baseAxios from '../../library/api'
import InputKeyboard from './InputKeyboard'
import DeleteModal from './DeleteModal'
import ListHeader from '../../components/ListHeader/ListHeader'
import { SCREEN_WIDTH, FULL_SCREEN_HEIGHT } from '../../assets/dimension'
import SignInButton from '../../components/SignIn/SignInButton'
import { icons } from '../../assets/icons'
import { Divider } from '../../components'
import palette from '../../assets/palette'

const TEXT_INPUT_HEIGHT = 40

class CommentScreen extends React.PureComponent {
  state = {
    inputValue: '',
    inputHeight: new Animated.Value(TEXT_INPUT_HEIGHT),
    commentAfterId: null,
    comments: [],
    isLoading: true,
    refreshing: false,
    isModalOpen: false,
    isSettingModalOpen: false,
    selectedComment: null,
    isEdit: false,
    editing: false,
    isOverflowOpen: false,
    isDelete: false
  }

  inputRef = React.createRef()

  keyboardHeight = new Animated.Value(0)

  _handleRefresh = () => {
    this.setState(
      { refreshing: true, commentAfterId: null, isLoading: true },
      () => {
        this._fetchCommentSculpture()
      }
    )
  }

  _selectComment = selectedComment => {
    this.setState({ selectedComment, isSettingModalOpen: true })
  }

  _openModal = () => {
    this.setState({ isModalOpen: true, isEdit: false })
  }

  _closeModal = () => {
    this.setState({ isModalOpen: false, selectedComment: null })
  }

  _closeSettingModal = () => {
    this.setState({ isSettingModalOpen: false })
  }

  _handleEditComment = () => {
    const { comments, selectedComment } = this.state
    if (selectedComment) {
      const { text } = selectedComment
      this.setState({ isSettingModalOpen: false }, () => {
        setTimeout(() => {
          this.inputRef.current.focus()
          this.setState({ inputValue: text, isEdit: true })
        }, 600)
      })
    }
  }

  _editComment = () => {
    const { comments, selectedComment, inputValue } = this.state
    this.setState({ editing: true })

    baseAxios
      .patch('comment', {
        commentId: selectedComment.commentId,
        content: inputValue.trim()
      })
      .then(res => {
        const resData = res.data
        this.props.editComment(resData)
        this.setState({ commentAfterId: null }, () => {
          this._fetchCommentSculpture()
        })

        this.setState({ isOverflowOpen: true })
        setTimeout(() => {
          this.setState({
            isOverflowOpen: false,
            isEdit: false
          })
        }, 2000)
      })
      .catch(() => {
        console.log('Error! Can not edit comment!')
        this.setState({ commentAfterId: null }, () => {
          this._fetchCommentSculpture()
        })
      })
  }

  _deleteComment = () => {
    const { comments, selectedComment } = this.state
    if (selectedComment) {
      const { commentId } = selectedComment
      this.setState({
        isModalOpen: false,
        isOverflowOpen: true,
        isDelete: true,
        comments: comments.filter(element => element.commentId !== commentId)
      })

      setTimeout(() => {
        baseAxios
          .delete(`comment/${commentId}`)
          .then(() => {
            this.props.deleteComment(selectedComment.commentId)
            this.setState({ commentAfterId: null }, () => {
              this._fetchCommentSculpture()
            })
          })
          .catch(() => {
            console.log('Error! Cant not delete this comment!')
            this.setState({ commentAfterId: null }, () => {
              this._fetchCommentSculpture()
            })
          })
        this.setState({ isOverflowOpen: false, isDelete: false })
      }, 2000)
    }
  }

  componentDidMount = () => {
    this._fetchCommentSculpture()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    )
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    )
  }

  componentWillUnmount = () => {
    this.backHandler.remove()
    this.keyboardDidShowSub.remove()
    this.keyboardDidHideSub.remove()
  }

  handleChangeText = text => {
    this.setState({ inputValue: text })
  }

  handleKeyboardDidShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 1,
      toValue: event.endCoordinates.height
    }).start()
  }

  handleKeyboardDidHide = () => {
    this.setState({
      inputValue: '',
      isEdit: false
      //  selectedComment: null,
    })
    Animated.timing(this.keyboardHeight, {
      duration: 1,
      toValue: 0
    }).start()
  }
  _handleLoadMore = () => {
    const { comments, commentAfterId } = this.state
    if (commentAfterId !== comments[comments.length - 1].commentId) {
      // console.log('trigger')
      this.setState(
        {
          commentAfterId: comments[comments.length - 1].commentId,
          isLoading: true
        },
        () => {
          this._fetchCommentSculpture()
        }
      )
    }
  }

  _fetchCommentSculpture = () => {
    const { commentAfterId } = this.state
    const sculptureId = this.props.navigation.getParam('id', 'unknown1')
    baseAxios
      .get(
        `comment/sculpture-id/${sculptureId}?${
          commentAfterId ? `after=${commentAfterId}` : ''
        }&limit=10`
      )
      .then(res => res.data)
      .then(resData => {
        const comments = resData.map(element => {
          const {
            commentId,
            content,
            user: { userId, picture, name, nickname },
            sculpture: { accessionId, images },
            createdTime
          } = element
          return {
            commentId,
            text: content,
            userId,
            userImg: picture,
            userName: userId.includes('auth0') ? nickname : name,
            sculptureId: accessionId,
            photoURL: images.length ? images[0].url : null,
            submitDate: createdTime
          }
        })
        this.setState({
          comments: commentAfterId
            ? [...this.state.comments, ...comments]
            : comments,
          isLoading: false,
          editing: false,
          refreshing: false
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          isLoading: true,
          editing: false,
          refreshing: false
        })
      })
  }

  _onSubmit = () => {
    const sculptureId = this.props.navigation.getParam('id', 'unknown1')
    const { user } = this.props
    const { inputValue, isEdit, selectedComment, comments } = this.state
    if (isEdit && selectedComment) {
      const { text } = selectedComment
      if (inputValue.trim() !== text) {
        this._editComment()
      }
    } else {
      const postingComment = {
        userId: user.userId,
        userImg: user.picture,
        userName: user.username,
        sculptureId,
        text: inputValue.trim()
      }
      this.setState({
        isLoading: true,
        comments: [postingComment, ...this.state.comments]
      })
      baseAxios
        .post('comment', {
          sculptureId,
          content: inputValue.trim()
        })
        .then(res => res.data)
        .then(resData => {
          this.props.addComment(resData)
          this.setState({ commentAfterId: null }, () =>
            this._fetchCommentSculpture()
          )
        })
        .catch(() => 'Can not add comment')
    }

    this.setState({ inputValue: '' })
    Keyboard.dismiss()
  }

  render() {
    const {
      inputValue,
      inputHeight,
      comments,
      isLoading,
      isModalOpen,
      isEdit,
      editing,
      refreshing,
      isOverflowOpen,
      selectedComment,
      isSettingModalOpen,
      isDelete
    } = this.state
    const {
      user: { picture },
      loggedIn
    } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ListHeader
          headerName="Comments"
          leftButtonDisable={isLoading || isOverflowOpen}
        />
        <CommentList
          _handleLoadMore={this._handleLoadMore}
          refreshing={refreshing}
          _handleRefresh={this._handleRefresh}
          _handleEditComment={this._handleEditComment}
          _selectComment={this._selectComment}
          _openModal={this._openModal}
          comments={comments}
          navigation={this.props.navigation}
          isLoading={isLoading}
          editing={editing}
        />
        <Modal
          animationIn="slideInUp"
          animationInTiming={500}
          animationOut="slideOutDown"
          animationOutTiming={500}
          deviceHeight={FULL_SCREEN_HEIGHT}
          isVisible={isSettingModalOpen}
          onBackdropPress={this._closeSettingModal}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
        >
          <View style={styles.iosMenuStyle}>
            <TouchableHighlight
              underlayColor="#FAFAFA"
              onPress={() => {
                this._handleEditComment()
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  paddingHorizontal: 24
                }}
              >
                <View style={{ width: 50 }}>{icons.edit}</View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTextLg}>Edit</Text>
                </View>
              </View>
            </TouchableHighlight>
            <Divider styles={{ marginVertical: 0 }} />
            <TouchableHighlight
              underlayColor="#FAFAFA"
              onPress={() => {
                this.setState({ isSettingModalOpen: false }, () => {
                  setTimeout(() => {
                    this.setState({ isModalOpen: true })
                  }, 600)
                })
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  paddingHorizontal: 24
                }}
              >
                <View style={{ width: 50 }}>{icons.delete}</View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTextLg}>Delete</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
        {loggedIn ? (
          <InputKeyboard
            keyboardHeight={this.keyboardHeight}
            isEdit={isEdit}
            editing={editing}
            ref={this.inputRef}
            picture={picture}
            inputHeight={inputHeight}
            inputValue={inputValue}
            _onSubmit={this._onSubmit}
            handleChangeText={this.handleChangeText}
            selectedComment={selectedComment}
            isSettingModalOpen={isSettingModalOpen}
          >
            {isOverflowOpen && (
              <View
                style={{
                  backgroundColor: 'rgba(0,71,187,0.9)',
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  flexDirection: 'row'
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.menuText, { color: '#FFF' }]}>
                    {!isDelete ? 'Comment edited.' : 'Comment deleted.'}
                  </Text>
                </View>
              </View>
            )}
          </InputKeyboard>
        ) : (
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
              position: 'absolute',
              width: SCREEN_WIDTH,
              elevation: 20,
              bottom: 0
            }}
          >
            <Text
              style={[
                styles.title,
                { fontSize: 14, marginBottom: 12, marginTop: 10 }
              ]}
            >
              Sign in to comment
            </Text>
            <SignInButton />
          </View>
        )}
        <DeleteModal
          isModalOpen={isModalOpen}
          _closeModal={this._closeModal}
          _deleteComment={this._deleteComment}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix,
  user: getState.authReducer.user,
  loggedIn: getState.authReducer.loggedIn
})

const mapDispatchToProps = {
  addComment,
  deleteComment,
  editComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentScreen)
