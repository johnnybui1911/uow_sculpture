import React from 'react'
import { connect } from 'react-redux'
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import Modal from 'react-native-modal'
import styles from '../Comment/styles'
import ListHeader from '../../components/ListHeader/ListHeader'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../assets/dimension'
import baseAxios from '../../library/api'
import { signInSuccesful } from '../../redux/actions'

class EditProfile extends React.PureComponent {
  state = {
    username: '',
    errors: {},
    isModalOpen: false,
    image: null,
    isLoading: false
  }

  username = null

  componentDidMount = () => {
    this._getPermissionAsync()
    const {
      user: { username, picture }
    } = this.props
    this.setState({ username, image: picture })
  }

  _handleChangeText = (text, name) => {
    let { errors } = this.state
    if (!text.trim()) {
      errors[name] = 'Should not be empty'
    } else {
      if (errors[name]) {
        delete errors[name]
      }
    }
    this.setState({ [name]: text, errors })
  }

  _onSubmitUsername = () => {
    this.username.blur()
  }

  _onSubmit = () => {
    const { username, image, isLoading } = this.state
    const { user } = this.props
    let formData = new FormData()
    if ((username || image) && !isLoading) {
      this.setState({ isLoading: true })
      formData.append('userId', user.userId)
      if (image !== user.picture) {
        const localUri = image
        const filename = localUri.split('/').pop()
        const fileType = localUri.substring(localUri.lastIndexOf('.') + 1)
        formData.append('picture', {
          uri: localUri,
          name: filename,
          type: `image/${fileType}`
        })
        formData.append('picture', image)
      }

      if (username) {
        formData.append('nickname', username)
      }

      this.username.blur()
      baseAxios
        .patch('user/me', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          const { userId, name, email, joinDate, picture, nickname } = res.data
          const user = {
            userId,
            username: userId.includes('auth0') ? nickname : name,
            email,
            joinDate,
            picture
          }
          this.props.signInSuccesful(user)
        })
        .then(() => {
          this.setState({ isLoading: false })
          this.props.navigation.goBack()
        })
        .catch(e => {
          console.log(e.message)
          console.log('Error! Can not edit user profile')
          this.setState({ isLoading: false })
        })
    }
  }

  _getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  _pickImage = async () => {
    this._closeModal()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    })
    // console.log(result)
    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  _takePhoto = async () => {
    this._closeModal()
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!')
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    })

    // console.log(result)
    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  _openModal = () => {
    this.setState({ isModalOpen: true })
  }

  _closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  _renderModal = () => {
    const { _pickImage, _closeModal, _takePhoto } = this
    const { isModalOpen } = this.state
    return (
      <Modal
        isVisible={isModalOpen}
        onBackdropPress={_closeModal}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
          //   paddingHorizontal: 12
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 4,
            justifyContent: 'space-between',
            width: SCREEN_WIDTH - 24 * 2
            // padding: 24,
            // paddingBottom: 24 - 4
          }}
        >
          <View style={{ padding: 18 }}>
            <Text style={[styles.title, { fontSize: 18 }]}>
              Change Profile Photo
            </Text>
          </View>
          <View
            style={{
              borderTopColor: 'grey',
              borderTopWidth: 1
            }}
          >
            <TouchableHighlight
              underlayColor="#FAFAFA"
              style={{ padding: 18, width: '100%' }}
              onPress={_takePhoto}
            >
              <View style={{ paddingLeft: 4 }}>
                <Text style={[styles.title, { fontSize: 16 }]}>Take photo</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#FAFAFA"
              style={{ padding: 18, width: '100%' }}
              onPress={_pickImage}
            >
              <View style={{ paddingLeft: 4 }}>
                <Text style={[styles.title, { fontSize: 16 }]}>
                  Choose from library
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const { user } = this.props
    const { username, errors, image, isLoading } = this.state
    const SubmitButton = icons.check({
      style: {
        opacity: !username && (image === user.picture || !image) ? 0.3 : 1
      }
    })
    return (
      <SafeAreaView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {this._renderModal()}
        <ListHeader
          headerName="Edit Profile"
          rightButton={
            isLoading ? (
              <ActivityIndicator
                size="small"
                color={palette.primaryColorLight}
              />
            ) : (
              SubmitButton
            )
          }
          handleRightButton={this._onSubmit}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100 / 2,
                backgroundColor: palette.primaryColor,
                overflow: 'hidden'
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ height: 100, width: 100 }}
                resizeMode="cover"
              />
            </View>
            <TouchableWithoutFeedback onPress={this._openModal}>
              <View style={{ paddingVertical: 15, paddingHorizontal: 8 }}>
                <Text
                  style={[
                    styles.title,
                    { fontSize: 18, color: palette.primaryColorLight }
                  ]}
                >
                  Change Photo
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 24 }}>
            <TextField
              ref={ref => (this.username = ref)}
              label="Username"
              value={username}
              tintColor={palette.primaryColorLight}
              baseColor={palette.secondaryTypographyStrongColor}
              onChangeText={text => this._handleChangeText(text, 'username')}
              returnKeyType="done"
              enablesReturnKeyAutomatically
              onSubmitEditing={this._onSubmitUsername}
              error={errors.username}
              errorColor={palette.secondaryColor}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({ user: getState.authReducer.user })
const mapDispatchToProps = {
  signInSuccesful
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)
