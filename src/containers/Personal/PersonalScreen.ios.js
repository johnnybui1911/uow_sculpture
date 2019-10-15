/* eslint-disable react/sort-comp */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {
  SafeAreaView,
  View,
  Animated,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  PanResponder,
  StyleSheet,
  Text,
  Image,
  StatusBar
} from 'react-native'
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'
import { TabView, TabBar } from 'react-native-tab-view'
import styles from './styles'
import palette from '../../assets/palette'
import LikeScreen from './TabLike/LikeScreen'
import AboutScreen from './AboutScreen'
import CommentScreen from './TabComment/CommentScreen'
import {
  SCREEN_WIDTH,
  PROFILE_HEADER_HEIGHT,
  PROFILE_TAB_BAR_HEIGHT,
  SCROLLABLE_HEIGHT,
  BOTTOM_TAB_BAR_HEIGHT,
  MINI_HEADER_HEIGHT,
  STATUS_BAR_HEIGHT
} from '../../assets/dimension'
import PersonalHeader from './PersonalHeader'
import { fetchUserDataThunk, fetchDataThunk } from '../../redux/actions'
import { shadowIOS } from '../../assets/rootStyles'
import CollapsibleHeader from './CollapsibleHeader'
import CustomStatusBar from '../../components/CustomStatusBar'
import { NavigationEvents } from 'react-navigation'
import animations from '../../assets/animations'

const initialLayout = {
  height: 0,
  width: SCREEN_WIDTH
}

class PersonalScreen extends React.PureComponent {
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !(gestureState.dx === 0 && gestureState.dy === 0)
    },
    // onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, gestureState) => {
      this.state.scrollHeader.setOffset(this.state.scrollHeader.__getValue())
      this.state.scrollHeader.setValue(0)
    },

    onPanResponderMove: (e, gestureState) => {
      const { scrollTop } = this.state
      if (gestureState.dy > 0 && gestureState.dy <= 100 && scrollTop) {
        // console.log(gestureState)
        this.state.scrollHeader.setValue(gestureState.dy)
        this.state.loadingAnimate.setValue(gestureState.dy)
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      this.state.scrollHeader.flattenOffset()
      console.log(gestureState)
      const { refreshing } = this.state
      if (!refreshing) {
        if (
          (gestureState.dy > 0 && gestureState.dy <= 80) ||
          gestureState.dy < 0
        ) {
          Animated.parallel([
            Animated.timing(this.state.loadingAnimate, {
              toValue: 0,
              duration: 800
            }),
            Animated.timing(this.state.scrollHeader, {
              toValue: 0,
              duration: 500
            })
          ]).start()
        } else {
          // this.state.loadingAnimate.setValue(0)
          this.setState({ refreshing: true }, () => {
            this.animation.play()

            this.props
              .fetchDataThunk()
              .then(() => {
                Animated.timing(this.state.scrollHeader, {
                  toValue: 0,
                  duration: 500
                }).start(() => {
                  // this.animation.reset()
                  this.setState({ refreshing: false })
                })
              })
              .catch(error => {
                Animated.timing(this.state.scrollHeader, {
                  toValue: 0,
                  duration: 500
                }).start(() => {
                  // this.animation.reset()
                  this.setState({ refreshing: false })
                })
                console.log(error)
              })
          })
        }
      }
    }
  })
  _panResponderScrollView = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { scrollTop } = this.state
      return !(gestureState.dx === 0 && gestureState.dy === 0) || scrollTop
    },
    onPanResponderGrant: (e, gestureState) => {
      this.state.scrollHeader.setOffset(this.state.scrollHeader.__getValue())
      this.state.scrollHeader.setValue(0)
    },

    onPanResponderMove: (e, gestureState) => {
      const { scrollTop } = this.state
      if (gestureState.dy > 0 && gestureState.dy <= 100 && scrollTop) {
        // console.log(gestureState)
        this.state.scrollHeader.setValue(gestureState.dy)
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      this.state.scrollHeader.flattenOffset()
      const { refreshing } = this.state
      if (!refreshing) {
        if (gestureState.dy > 0 && gestureState.dy <= 80) {
          Animated.timing(this.state.scrollHeader, {
            toValue: 0
          }).start()
        } else {
          this.setState({ refreshing: true }, () => {
            // Animated.timing(this.state.scrollHeader, {
            //   toValue: 0,
            //   delay: 1000
            // }).start(() => this.setState({ refreshing: false }))

            this.props
              .fetchDataThunk()
              .then(() => {
                Animated.timing(this.state.scrollHeader, {
                  toValue: 0
                }).start(() => this.setState({ refreshing: false }))
              })
              .catch(error => {
                Animated.timing(this.state.scrollHeader, {
                  toValue: 0
                }).start(() => this.setState({ refreshing: false }))
                console.log(error)
              })
          })
        }
      }
    }
  })

  state = {
    loadingAnimate: new Animated.Value(0),
    scrollHeader: new Animated.Value(0),
    scrollY: new Animated.Value(0),
    index: 0,
    routes: [
      { key: 'LIKE', title: 'LIKES' },
      { key: 'COMMENT', title: 'COMMENTS' },
      { key: 'ABOUT', title: 'ABOUT' }
    ],
    refreshing: false,
    scrollTop: true,
    showMiniHeader: false
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props
          .fetchDataThunk()
          .then(() => {
            this.setState({
              refreshing: false
            })
          })
          .catch(error => {
            this.setState({
              refreshing: false
            })
            console.log(error)
          })
      }
    )
  }

  _renderHeader = props => {
    const { user } = this.props
    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT],
      extrapolate: 'clamp'
    })

    const translateHeaderY = this.state.scrollY.interpolate({
      inputRange: [260, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT],
      extrapolate: 'clamp'
    })

    const opacityAnimate = this.state.scrollY.interpolate({
      inputRange: [0, 240, SCROLLABLE_HEIGHT],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    const opacityAnimateHide = this.state.scrollY.interpolate({
      inputRange: [0, 210, 250],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

    const scaleImageAnimation = this.state.scrollY.interpolate({
      inputRange: [0, 240, SCROLLABLE_HEIGHT],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp'
    })

    // const translateY = this.state.scrollY.interpolate({
    //   inputRange: [0, SCROLLABLE_HEIGHT],
    //   outputRange: [0, -SCROLLABLE_HEIGHT],
    //   extrapolate: 'clamp'
    // })

    // const translateHeaderY = this.state.scrollY.interpolate({
    //   inputRange: [SCROLLABLE_HEIGHT / 1.6, SCROLLABLE_HEIGHT],
    //   outputRange: [0, -SCROLLABLE_HEIGHT],
    //   extrapolate: 'clamp'
    // })

    // const opacityAnimate = this.state.scrollY.interpolate({
    //   inputRange: [0, SCROLLABLE_HEIGHT / 2, SCROLLABLE_HEIGHT],
    //   outputRange: [0, 0, 1],
    //   extrapolate: 'clamp'
    // })

    // const opacityAnimateHide = this.state.scrollY.interpolate({
    //   inputRange: [0, SCROLLABLE_HEIGHT / 1.6, SCROLLABLE_HEIGHT],
    //   outputRange: [1, 0, 0],
    //   extrapolate: 'clamp'
    // })

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
          ...shadowIOS,
          transform: [{ translateY: translateY }]
        }}
        {...this._panResponder.panHandlers}
      >
        <CollapsibleHeader
          user={user}
          opacityAnimate={opacityAnimate}
          scaleImageAnimation={scaleImageAnimation}
        />
        <Animated.View
          style={{
            opacity: opacityAnimateHide,
            transform: [{ translateY: translateHeaderY }]
          }}
        >
          <PersonalHeader
            refreshing={this.state.refreshing}
            _handleRefresh={this._handleRefresh}
          />
        </Animated.View>
        <TabBar
          {...props}
          style={{
            backgroundColor: palette.backgroundColorWhite,
            height: PROFILE_TAB_BAR_HEIGHT,
            borderBottomColor: palette.dividerColorNew,
            borderBottomWidth: StyleSheet.hairlineWidth
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
    // if (y <= SCROLLABLE_HEIGHT + 20) {
    if (view !== 'LIKE') {
      this._LikeScreenScrollV.getNode().scrollTo({ x: 0, y, animated: false })
    }
    if (view !== 'COMMENT') {
      this._CommentScreenScrollV
        .getNode()
        .scrollTo({ x: 0, y, animated: false })
    }
    if (view !== 'ABOUT') {
      this._AboutScreenScrollV.getNode().scrollTo({ x: 0, y, animated: false })
    }
    // }
  }

  _renderSence = ({ route }) => {
    const routeKey = route.key.toString()

    let refFunc = null
    let tabToCheck = 0
    let content = null

    switch (routeKey) {
      case 'LIKE':
        refFunc = scrollView => {
          this._LikeScreenScrollV = scrollView
        }
        tabToCheck = 0
        content = <LikeScreen />
        break

      case 'COMMENT':
        refFunc = scrollView => {
          this._CommentScreenScrollV = scrollView
        }
        tabToCheck = 1
        content = <CommentScreen />
        break

      case 'ABOUT':
        refFunc = scrollView => {
          this._AboutScreenScrollV = scrollView
        }
        tabToCheck = 2
        content = <AboutScreen />
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
          paddingTop: PROFILE_HEADER_HEIGHT + PROFILE_TAB_BAR_HEIGHT
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          {
            useNativeDriver: true,
            listener: event => {
              const y = event.nativeEvent.contentOffset.y
              if (this.state.index === tabToCheck) {
                if (y > 0) {
                  this.setState({ scrollTop: false })
                } else {
                  this.setState({ scrollTop: true })
                }
                if (y > 250) {
                  this.setState({ showMiniHeader: true })
                } else {
                  this.setState({ showMiniHeader: false })
                }
                this.alignScrollViews(routeKey, y)
              }
            }
          }
        )}
        // {...this._panResponderScrollView.panHandlers}
      >
        <View style={styles.tabViewStyle}>{content}</View>
      </Animated.ScrollView>
    )
  }

  _refresh = nativeEvent => {
    // console.log(nativeEvent)
    const { contentOffset } = nativeEvent
    if (contentOffset.y <= 0) {
      this._handleRefresh()
    }
  }

  render() {
    const { user, isLoadingUser } = this.props
    const { showMiniHeader, refreshing } = this.state

    const loadingAnimation = this.state.loadingAnimate.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const translateHeaderY = this.state.scrollHeader.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    })

    const opacityAnimateHide = this.state.scrollY.interpolate({
      inputRange: [240, SCROLLABLE_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            StatusBar.setBarStyle(
              showMiniHeader ? 'dark-content' : 'light-content'
            )
          }}
          onWillBlur={() => {
            StatusBar.setBarStyle('dark-content')
          }}
        />
        <StatusBar
          barStyle={showMiniHeader ? 'dark-content' : 'light-content'}
        />
        <Animated.View
          style={{
            height: STATUS_BAR_HEIGHT,
            backgroundColor: palette.primaryColor,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity: opacityAnimateHide,
            zIndex: 2
          }}
        />
        <Animated.View
          style={{
            backgroundColor: palette.primaryColor,
            height: translateHeaderY,
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <LottieView
            ref={animation => {
              this.animation = animation
            }}
            source={animations.header_loading}
            progress={loadingAnimation}
          />
          {/* <SkypeIndicator
            color="white"
            // count={2}
            animating={false}
            hidesWhenStopped={false}
          /> */}
          {/* <ActivityIndicator
            size="large"
            color={palette.backgroundColorWhite}
            hidesWhenStopped={false}
            animating={false}
          /> */}
        </Animated.View>
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
const mapStateToProps = getState => ({
  user: getState.authReducer.user,
  isLoadingUser: getState.markerReducer.isLoadingUser
})

const mapDispatchToProps = {
  fetchUserDataThunk,
  fetchDataThunk
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalScreen)
