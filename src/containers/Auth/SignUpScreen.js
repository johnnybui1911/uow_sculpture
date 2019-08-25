import React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from 'react-native'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import { FIXED_HEIGHT_AUTH } from '../../assets/dimension'

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10
            }}
          >
            {icons.camera}
          </View>
          <View style={{ marginVertical: 15 }}>
            <Text style={[styles.title, { fontSize: 14 }]}>
              Upload Profile Picture
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={[styles.inputBox]}>
              <View>{icons.fullName}</View>
              <TextInput
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
                style={styles.input}
              />
            </View>
            <View style={[styles.inputBox, { marginTop: 10 }]}>
              <View>{icons.mail}</View>
              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                style={styles.input}
              />
            </View>
            <View style={[styles.inputBox, { marginTop: 10 }]}>
              <View>{icons.lock}</View>
              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
            </View>
            <View style={[styles.inputBox, { marginTop: 10 }]}>
              <View>{icons.lock}</View>
              <TextInput
                value={this.state.confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={[
                styles.box,
                {
                  marginTop: 15,
                  marginBottom: 10,
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

export default SignUpScreen
