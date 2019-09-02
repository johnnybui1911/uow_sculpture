/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import styles from './styles'
import palette from '../../assets/palette'
import LikeScreen from './LikeScreen'
import images from '../../assets/images'
import AboutScreen from './AboutScreen'
import ProfileBox from './ProfileBox'
import CommentScreen from './CommentScreen'
import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../assets/dimension'

const HEADER_HEIGHT = 400
const TAB_BAR_HEIGHT = 44
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT // FIX LATER

const initialLayout = {
  height: 0,
  width: SCREEN_WIDTH
}

const PersonalHeader = ({
  user = {
    username: 'Cristiano Ronaldo',
    email: 'cristiano@gmail.com',
    joinDate: new Date('October 13, 2014'),
    likes: 3,
    comments: 4,
    visited: 3
  }
}) => {
  return (
    <View style={styles.profileFixedContainer}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.titleButton}>EDIT</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 15
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
          <Image source={images.profile} resizeMode="center" />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text
            style={[
              styles.title,
              { fontSize: 24, color: palette.backgroundColorWhite }
            ]}
          >
            {user.username}
          </Text>
        </View>
      </View>
      <ProfileBox
        likes={user.likes}
        comments={user.comments}
        visited={user.visited}
      />
    </View>
  )
}

class PersonalScreen extends React.PureComponent {
  static defaultProps = {
    user: {
      username: 'Cristiano Ronaldo',
      email: 'cristiano@gmail.com',
      joinDate: new Date('October 13, 2014'),
      likes: 3,
      comments: 4,
      visited: 3
    }
  }

  state = {
    scrollY: new Animated.Value(0),
    index: 0,
    routes: [
      { key: 'LIKE', title: 'LIKES' },
      { key: 'COMMENT', title: 'COMMENTS' },
      { key: 'ABOUT', title: 'ABOUT' }
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
        <PersonalHeader />
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
        content = <AboutScreen navigation={this.props.navigation} />
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
        <View style={styles.tabViewStyle}>{content}</View>
      </Animated.ScrollView>
    )
  }

  render() {
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

export default PersonalScreen
