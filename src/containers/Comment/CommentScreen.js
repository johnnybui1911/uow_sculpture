import React from 'react'
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import Header from './Header'
import { _handleNotification } from '../../library/notificationTask'
import CommentList from './CommentList'
import images from '../../assets/images'
import palette from '../../assets/palette'
import { SCREEN_WIDTH } from '../../assets/dimension'

const localComments = [
  {
    userId: 1,
    name: 'Cristiano Ronaldo',
    photoURL: 1,
    text: 'Hello',
    submitDate: new Date(2019, 5, 24, 10, 33, 30)
  },
  {
    userId: 2,
    name: 'David Beckham',
    text:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    submitDate: new Date(2019, 5, 29, 10, 33, 30)
  },
  {
    userId: 1,
    name: 'Cristiano Ronaldo',
    photoURL: 1,
    text:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    submitDate: new Date(2019, 5, 29, 10, 33, 30)
  },
  {
    userId: 2,
    name: 'David Beckham',
    text:
      'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
    submitDate: new Date(2019, 5, 29, 10, 33, 30)
  },
  {
    userId: 1,
    name: 'Cristiano Ronaldo',
    photoURL: 1,
    text: 'Hello',
    submitDate: new Date()
  }
]

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
    inputValue: ''
  }

  _textInput = null

  _onSubmit = () => {
    const { item } = this.props
    const { inputValue } = this.state

    // send post API to back end
    const postData = {
      userId: 1,
      name: 'Cristiano Ronaldo',
      sculptureId: item.id,
      text: inputValue,
      submitDate: new Date(),
      photoURL: 1
    }
    localComments.push(postData)

    this.setState({ inputValue: '' })
    // this._textInput.clear() // can not clear text input during typing with keyboard
    // this._textInput.setNativeProps({ text: '' })
    Keyboard.dismiss()
  }

  render() {
    const id = this.props.navigation.getParam('id', -1)
    const item =
      id === -1
        ? this.props.item
        : this.props.markers.find(item => item.id === id)
    const { inputValue } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <CommentList
          comments={localComments.sort((a, b) => {
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
            source={images.profile}
            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              marginLeft: 7,
              height: 40,
              backgroundColor: palette.backgroundColorWhite,
              borderRadius: 12,
              borderColor: palette.secondaryTypographyColor,
              borderWidth: 0.5
            }}
          >
            <TextInput
              ref={component => (this._textInput = component)}
              autoFocus
              value={inputValue}
              onChangeText={text => this.setState({ inputValue: text })}
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
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers
})

export default connect(mapStateToProps)(CommentScreen)
