import React from 'react'
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import Header from './Header'
import { _handleNotification } from '../../library/notificationTask'
import CommentList from './CommentList'
import images from '../../assets/images'
import palette from '../../assets/palette'
import { SCREEN_WIDTH } from '../../assets/dimension'
import { addComment } from '../../redux/actions/authActions'
import baseAxios from '../../library/api'

const localComments = [
  {
    sculptureId: 1986.058,
    userId: 'hnb133',
    content: 'Hello',
    createdTime: new Date(2019, 5, 24, 10, 33, 30)
  },
  {
    sculptureId: 1987.08,
    userId: 'hnb134',
    content:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    createdTime: new Date(2019, 5, 29, 10, 33, 30)
  },
  {
    sculptureId: 1987.081,
    userId: 'hnb135',
    content:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    createdTime: new Date()
  }
]

const TEXT_INPUT_HEIGHT = 40

class CommentScreen extends React.PureComponent {
  static defaultProps = {
    item: {
      id: 1,
      name: 'Winged Figure',
      distance: 500,
      duration: 5,
      des: 'Western side of Robsons Road',
      features: {
        date: '1988-1989',
        maker: 'Bert Flugelman',
        material: 'Stainless steel'
      },
      description: {
        location:
          'Main campus, on UOW land on the western side of  Robsons Road, Keiraville. Walking track entry from corner of Robsons Road and  Northfields Avenue',
        creditLine:
          'Commissioned by the Friends of the University of Wollongong in celebration of the Australian Bicentenary, 1988'
      },
      photoURL: 1,
      coordinate: {
        latitude: -34.40478,
        longitude: 150.88115
      }
    }
  }

  state = {
    inputValue: '',
    inputHeight: new Animated.Value(TEXT_INPUT_HEIGHT),
    comments: []
  }

  componentDidMount = () => {
    this._fetchCommentSculpture()
  }

  _fetchCommentSculpture = () => {
    const sculptureId = this.props.navigation.getParam('id', 1986.058)
    baseAxios
      .get(`comment/sculpture-id/${sculptureId}`)
      .then(res => res.data)
      .then(resData => {
        const comments = resData.map(element => {
          const {
            commentId,
            content,
            user: { userId, picture, name },
            sculpture: { accessionId, images },
            updatedTime
          } = element
          return {
            commentId,
            text: content,
            userId,
            userImg: picture,
            userName: name,
            sculptureId: accessionId,
            photoURL: images[0].url,
            submitDate: updatedTime
          }
        })
        this.setState({ comments })
      })
      .catch(e => console.log(e))
  }

  _contentInput = null

  _onSubmit = () => {
    const sculptureId = this.props.navigation.getParam('id', 1986.058)
    const { user } = this.props
    const { inputValue } = this.state

    const postingComment = {
      userId: user.userId,
      userImg: user.picture,
      sculptureId,
      text: inputValue
    }
    this.setState({ comments: [...this.state.comments, postingComment] })
    baseAxios
      .post('comment', {
        sculptureId,
        content: inputValue
      })
      .then(res => res.data)
      .then(resData => {
        this.props.addComment(resData)
        this._fetchCommentSculpture()
      })

    this.setState({ inputValue: '' })
    Keyboard.dismiss()
  }

  render() {
    const { inputValue, inputHeight, comments } = this.state
    const {
      user: { picture }
    } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <CommentList
          comments={comments.sort((a, b) => {
            return b.submitDate - a.submitDate
          })}
          navigation={this.props.navigation}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: SCREEN_WIDTH,
            backgroundColor: palette.backgroundColorWhite,
            elevation: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24
          }}
        >
          <Image
            source={{ uri: picture }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              alignSelf: 'flex-end',
              marginBottom: 10,
              backgroundColor: '#F6F6F6'
            }}
          />
          <Animated.View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              marginLeft: 7,
              height: inputHeight,
              backgroundColor: '#F2F3F5',
              borderRadius: 16,
              borderColor: 'rgba(0,0,0,0)'
            }}
          >
            <TextInput
              onContentSizeChange={e => {
                const { height } = e.nativeEvent.contentSize
                if (height < TEXT_INPUT_HEIGHT * 3)
                  Animated.timing(inputHeight, {
                    toValue: height,
                    duration: 100
                  }).start()
              }}
              multiline
              numberOfLines={4}
              ref={component => (this._contentInput = component)}
              value={inputValue}
              onChangeText={text => this.setState({ inputValue: text })}
              placeholder="Add a comment..."
              underlineColorAndroid="rgba(0,0,0,0)"
              style={{
                flex: 1,
                padding: 10,
                width: '100%',
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
                color: palette.primaryColor
              }}
              placeholderTextColor="rgb(110, 117, 125)"
            />
            <TouchableWithoutFeedback onPress={this._onSubmit}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  padding: 10,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 14,
                  color: palette.primaryColorLight,
                  opacity: inputValue.trim() === '' ? 0 : 1
                }}
              >
                Post
              </Text>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix,
  user: getState.authReducer.user
})

const mapDispatchToProps = {
  addComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentScreen)
