import React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { thunkSignIn } from '../../redux/actions/authActions'
import MidDivider from '../../components/MidDivider/MidDivider'
class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.title}>Sign in with</Text>
            </View>
            <TouchableOpacity
              style={styles.box}
              onPress={() => this.props.handleAuthorize({ username: 'Name' })}
            >
              <View style={{ flex: 1, padding: 20 }}>{icons.google}</View>
              <View style={{ position: 'absolute' }}>
                <Text style={styles.titleButton}>GOOGLE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.box,
                { backgroundColor: palette.facebookColor, marginBottom: 0 }
              ]}
            >
              <View style={{ flex: 1, padding: 20 }}>{icons.facebook}</View>
              <View style={{ position: 'absolute' }}>
                <Text
                  style={[
                    styles.titleButton,
                    { color: palette.backgroundColorWhite }
                  ]}
                >
                  FACEBOOK
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <MidDivider />
          <View
            style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={styles.inputBox}>
              <View style={{ padding: 20 }}>{icons.mail}</View>
              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                style={styles.input}
              />
            </View>
            <View style={[styles.inputBox]}>
              <View style={{ padding: 20 }}>{icons.lock}</View>
              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
            </View>
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <Text style={[styles.title, { fontSize: 14 }]}>
                Dont't remember your password?
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.box,
                {
                  alignItems: 'center',
                  backgroundColor: palette.primaryColorLight
                }
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.titleButton,
                    { color: palette.backgroundColorWhite }
                  ]}
                >
                  SIGN IN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleAuthorize: userAuth => {
    dispatch(thunkSignIn(userAuth))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
