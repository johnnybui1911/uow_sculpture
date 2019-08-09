import React from 'react'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import MainScreen from './src/MainScreen'
import stores from './src/redux/stores'

export default class App extends React.PureComponent {
  state = {
    fontLoaded: false
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Font-Name': require('./assets/icons/icomoon.ttf')
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={stores}>
          <MainScreen />
        </Provider>
      )
    } else {
      return null
    }
  }
}
