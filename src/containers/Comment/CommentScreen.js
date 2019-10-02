import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  ActivityIndicator,
  BackHandler,
  Platform,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { _handleNotification } from '../../library/notificationTask'
import CommentList from './CommentList'
import palette from '../../assets/palette'
import {
  addComment,
  deleteComment,
  editComment
} from '../../redux/actions/authActions'
import baseAxios from '../../library/api'
import InputKeyboard from './InputKeyboard'
import DeleteModal from './DeleteModal'
import ListHeader from '../../components/ListHeader/ListHeader'
import { SCREEN_WIDTH } from '../../assets/dimension'
import SignInButton from '../../components/SignIn/SignInButton'

const TEXT_INPUT_HEIGHT = Platform.OS === 'ios' ? 45 : 40

class CommentScreen extends React.PureComponent {
  state = {
    inputValue: '',
    inputHeight: new Animated.Value(TEXT_INPUT_HEIGHT),
    comments: [],
    isLoading: true,
    refreshing: false,
    isModalOpen: false,
    selectedComment: null,
    isEdit: false,
    editing: false,
    isUndo: false,
    isOverflowOpen: false
  }

  inputRef = React.createRef()

  keyboardHeight = new Animated.Value(0)

  _handleRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    this._fetchCommentSculpture()
  }

  _selectComment = selectedComment => {
    this.setState({ selectedComment })
  }

  _openModal = () => {
    this.setState({ isModalOpen: true })
  }

  _closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  _handleEditComment = () => {
    const { comments, selectedComment } = this.state
    const { text } = selectedComment
    this.inputRef.current.focus()
    this.setState({ inputValue: text, isEdit: true })
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
        this._fetchCommentSculpture()

        this.setState({ isOverflowOpen: true })
        setTimeout(() => {
          this.setState({ isOverflowOpen: false, isEdit: false })
        }, 2000)
      })
      .catch(() => {
        console.log('Error! Can not edit comment!')
        this._fetchCommentSculpture()
      })
  }

  _deleteComment = () => {
    const { comments, selectedComment } = this.state
    const { commentId } = selectedComment
    this.setState({
      isModalOpen: false,
      isOverflowOpen: true,
      comments: comments.filter(element => element.commentId !== commentId)
    })

    setTimeout(() => {
      const { isUndo } = this.state
      if (!isUndo) {
        baseAxios
          .delete(`comment/${commentId}`)
          .then(() => {
            this.props.deleteComment(selectedComment.commentId)
            this._fetchCommentSculpture()
          })
          .catch(() => {
            console.log('Error! Cant not delete this comment!')
            this._fetchCommentSculpture()
          })
        this.setState({ isOverflowOpen: false })
      } else {
        this.setState({ isUndo: false })
      }
    }, 2000)
  }

  _handleUndo = () => {
    const { selectedComment, comments } = this.state
    if (selectedComment) {
      this.setState({
        comments: [selectedComment, ...comments],
        isUndo: true,
        isOverflowOpen: false
      })
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
    Animated.timing(this.keyboardHeight, {
      duration: 1,
      toValue: 0
    }).start()
  }

  _fetchCommentSculpture = () => {
    const sculptureId = this.props.navigation.getParam('id', 'unknown0')
    baseAxios
      .get(`comment/sculpture-id/${sculptureId}`)
      .then(res => res.data)
      .then(resData => {
        const comments = resData.map(element => {
          const {
            commentId,
            content,
            user: { userId, picture, name, nickname },
            sculpture: { accessionId, images },
            updatedTime
          } = element
          return {
            commentId,
            text: content,
            userId,
            userImg: picture,
            userName: userId.includes('auth0') ? nickname : name,
            sculptureId: accessionId,
            photoURL: images.length ? images[0].url : null,
            submitDate: updatedTime
          }
        })
        this.setState({
          comments,
          isLoading: false,
          // isEdit: false,
          editing: false,
          refreshing: false,
          selectedComment: null,
          isUndo: false
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          isLoading: true,
          // isEdit: false,
          editing: false,
          refreshing: false,
          selectedComment: null,
          isUndo: false
        })
      })
  }

  // _resetUI = () => {
  //   this.setState({
  //     isLoading: true,
  //     refreshing: false,
  //     selectedComment: null,
  //     isEdit: false,
  //     editing: false,
  //     isUndo: false,
  //     isOverflowOpen: false
  //   })
  // }

  _onSubmit = () => {
    const sculptureId = this.props.navigation.getParam('id', 'unknown0')
    const { user } = this.props
    const { inputValue, isEdit, selectedComment, comments } = this.state
    if (isEdit) {
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
      this.setState({ comments: [postingComment, ...this.state.comments] })
      baseAxios
        .post('comment', {
          sculptureId,
          content: inputValue.trim()
        })
        .then(res => res.data)
        .then(resData => {
          this.props.addComment(resData)
          this._fetchCommentSculpture()
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
      selectedComment
    } = this.state
    const {
      user: { picture },
      loggedIn
    } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ListHeader headerName="Comments" />
        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: 12
            }}
          >
            <ActivityIndicator color={palette.primaryColorLight} size="large" />
          </View>
        ) : (
          <CommentList
            refreshing={refreshing}
            _handleRefresh={this._handleRefresh}
            _handleEditComment={this._handleEditComment}
            _selectComment={this._selectComment}
            _openModal={this._openModal}
            comments={comments.sort((a, b) => {
              return (
                new Date(b.submitDate).getTime() -
                new Date(a.submitDate).getTime()
              )
            })}
            navigation={this.props.navigation}
          />
        )}
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
          >
            {isOverflowOpen && (
              <View
                style={{
                  backgroundColor: 'rgba(0,71,187,0.8)',
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  flexDirection: 'row'
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.menuText, { color: '#FFF' }]}>
                    {isEdit ? 'Comment edited.' : 'Comment deleted.'}
                  </Text>
                </View>
                {!isEdit && (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this._handleUndo()
                    }}
                  >
                    <View>
                      <Text style={[styles.menuText, { color: '#FFF' }]}>
                        Undo
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
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
