import React from 'react'
import { SafeAreaView, View, Animated, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import { TabView, TabBar } from 'react-native-tab-view'
import LottieView from 'lottie-react-native'
import styles from './styles'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'
import animations from '../../assets/animations'
import { SCREEN_WIDTH } from '../../assets/dimension'

const HEADER_HEIGHT = 209
const TAB_BAR_HEIGHT = 44
const SCROLLABLE_HEIGHT = HEADER_HEIGHT

// export const AuthTab = createMaterialTopTabNavigator(
//   {
//     SignIn: {
//       screen: SignInScreen,
//       navigationOptions: () => ({
//         title: 'SIGN IN'
//       })
//     },
//     SignUp: {
//       screen: SignUpScreen,
//       navigationOptions: () => ({
//         title: 'SIGN UP'
//       })
//     }
//   },
//   {
//     initialRouteName: 'SignIn',
//     animationEnabled: true,
//     tabBarOptions: {
//       style: {
//         justifyContent: 'center',
//         backgroundColor: palette.backgroundColorWhite
//       },
//       labelStyle: {
//         fontFamily: 'Montserrat-SemiBold',
//         fontSize: 14
//       },
//       activeTintColor: palette.primaryColor,
//       inactiveTintColor: palette.secondaryTypographyColor,
//       indicatorStyle: { backgroundColor: palette.primaryColorLight, height: 3 }
//     }
//   }
// )

// const AuthContainer = createAppContainer(AuthTab)

export const AuthHeader = () => (
  <View style={styles.header}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40
      }}
    >
      {icons.logo}
    </View>
  </View>
)

const initialLayout = {
  height: 0,
  width: SCREEN_WIDTH
}

class AuthScreen extends React.PureComponent {
  state = {
    scrollY: new Animated.Value(0),
    index: 0,
    routes: [
      { key: 'SIGN_IN', title: 'SIGN IN' },
      { key: 'SIGN_UP', title: 'SIGN UP' }
    ]
  }

  _renderHeader = props => {
    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT],
      extrapolate: 'clamp'
    })

    return (
      <Animated.View
        style={{
          backgroundColor: palette.primaryColor,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          overflow: 'hidden',
          elevation: 3,
          transform: [{ translateY: translateY }]
        }}
      >
        <AuthHeader />
        <TabBar
          {...props}
          style={{
            backgroundColor: palette.backgroundColorWhite,
            height: TAB_BAR_HEIGHT
          }}
          contentContainerStyle={{
            alignItems: 'center'
          }}
          indicatorStyle={{
            backgroundColor: palette.primaryColorLight,
            height: 3
          }}
          labelStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}
          activeColor={palette.primaryColor}
          inactiveColor={palette.secondaryTypographyColor}
        />
      </Animated.View>
    )
  }

  alignScrollViews = (view, y) => {
    if (y <= SCROLLABLE_HEIGHT + 20) {
      if (view !== 'SIGN_IN') {
        this._LikeScreenScrollV.getNode().scrollTo({ x: 0, y, animated: false })
      }
      if (view !== 'SIGN_UP') {
        this._CommentScreenScrollV
          .getNode()
          .scrollTo({ x: 0, y, animated: false })
      }
    }
  }

  _renderSence = ({ route }) => {
    const routeKey = route.key.toString()

    let refFunc = null
    let tabToCheck = 0
    let content = null

    switch (routeKey) {
      case 'SIGN_IN':
        refFunc = scrollView => {
          this._LikeScreenScrollV = scrollView
        }
        tabToCheck = 0
        content = <SignInScreen navigation={this.props.navigation} />
        break

      case 'SIGN_UP':
        refFunc = scrollView => {
          this._CommentScreenScrollV = scrollView
        }
        tabToCheck = 1
        content = <SignUpScreen />
        break

      default:
        return null
    }

    return (
      <Animated.ScrollView
        ref={refFunc}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          {
            useNativeDriver: true,
            listener: event => {
              const y = event.nativeEvent.contentOffset.y
              if (this.state.index === tabToCheck) {
                this.alignScrollViews(routeKey, y)
              }
            }
          }
        )}
      >
        <View style={{ backgroundColor: '#fff', flex: 1 }}>{content}</View>
      </Animated.ScrollView>
    )
  }

  render() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: palette.backgroundColorWhite }
        ]}
      >
        <TabView
          style={{ flex: 1 }}
          navigationState={this.state}
          renderTabBar={this._renderHeader}
          renderScene={this._renderSence}
          onIndexChange={index => this.setState({ index })}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    )
  }
}

export default AuthScreen
