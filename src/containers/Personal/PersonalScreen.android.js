/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {
  SafeAreaView,
  View,
  Animated,
  RefreshControl,
  PanResponder,
  Platform
} from 'react-native'
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
  STATUS_BAR_HEIGHT,
  SCROLLABLE_HEIGHT,
  PROFILE_HEADER_HEIGHT,
  PROFILE_TAB_BAR_HEIGHT
} from '../../assets/dimension'
import PersonalHeader from './PersonalHeader'
import { fetchUserDataThunk, fetchDataThunk } from '../../redux/actions'
import CollapsibleHeader from './CollapsibleHeader'

const initialLayout = {
  height: 0,
  width: SCREEN_WIDTH
}

class PersonalScreen extends React.PureComponent {
  state = {
    scrollY: new Animated.Value(0),
    index: 0,
    routes: [
      { key: 'LIKE', title: 'LIKES' },
      { key: 'COMMENT', title: 'COMMENTS' },
      { key: 'ABOUT', title: 'ABOUT' }
    ],
    refreshing: false
  }

  tabViewPosition = new Animated.Value(0)

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
    return (
      <Animated.View
        style={{
          backgroundColor: palette.backgroundColorWhite,
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
            elevation: 0
          }}
          pressColor={palette.secondaryTypographyColor}
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
                this.alignScrollViews(routeKey, y)
              }
            }
          }
        )}
        // onMomentumScrollBegin={event => {
        //   routeKey !== 'ABOUT' && this._refresh(event.nativeEvent)
        // }}
      >
        <View style={styles.tabViewStyle}>{content}</View>
      </Animated.ScrollView>
    )
  }

  _refresh = nativeEvent => {
    // console.log(nativeEvent)
    if (Platform.OS === 'ios') {
      const { contentOffset } = nativeEvent
      if (contentOffset.y <= 0) {
        this._handleRefresh()
      }
    } else {
      const { velocity, contentOffset } = nativeEvent
      if (contentOffset.y === 0 && velocity.y > 0 && !this.state.refreshing) {
        this._handleRefresh()
      }
    }
  }

  render() {
    const { user, isLoadingUser } = this.props
    const { refreshing } = this.state
    return (
      <SafeAreaView style={styles.container}>
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
