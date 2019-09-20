import React from 'react'
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
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
    inputHeight: new Animated.Value(TEXT_INPUT_HEIGHT)
  }

  _contentInput = null

  _onSubmit = () => {
    const sculptureId = this.props.navigation.getParam('id', 1986.058)
    const { user } = this.props
    const { inputValue } = this.state

    // send post API to back end
    const postData = {
      userId: user.userId,
      sculptureId,
      content: inputValue,
      createdTime: new Date()
    }
    localComments.push(postData)
    this.props.addComment(postData)

    this.setState({ inputValue: '' })
    Keyboard.dismiss()
  }

  render() {
    const { inputValue, inputHeight } = this.state
    const comments = localComments
      .map(item => {
        return {
          userId: item.userId,
          sculptureId: item.sculptureId,
          text: item.content,
          submitDate: item.createdTime
        }
      })
      .sort((a, b) => {
        return b.submitDate - a.submitDate
      })

    return (
      <SafeAreaView style={styles.container}>
        <CommentList comments={comments} navigation={this.props.navigation} />
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
            source={images.profile}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              alignSelf: 'flex-end',
              marginBottom: 10
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
              backgroundColor: palette.backgroundColorWhite,
              borderRadius: 12,
              borderColor: palette.secondaryTypographyColor,
              borderWidth: 0.5
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
              onChangeText={content => this.setState({ inputValue: content })}
              placeholder="Add a comment"
              style={{
                flex: 1,
                padding: 10,
                width: '100%',
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
                color: palette.primaryColor
              }}
              //clearButtonMode="while-editing" // ios only
              placeholderTextColor={palette.secondaryTypographyColor}
            />
            <TouchableWithoutFeedback onPress={this._onSubmit}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  padding: 10,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 16,
                  color: palette.primaryColorLight,
                  opacity: inputValue.trim() === '' ? 0.5 : 1
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
