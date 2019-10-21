/**
 * Description: Home Screen
 * Author: Nam Bui
 **/

import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
  Animated,
  FlatList,
  Platform
} from 'react-native'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import {
  Placeholder,
  PlaceholderMedia,
  Fade,
  PlaceholderLine
} from 'rn-placeholder'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import PopularList from './PopularList'
import NearbyItem from './NearbyItem'
import PopularItem from './PopularItem'
import { _handleNotification } from '../../library/notificationTask'
import { fetchDataThunk } from '../../redux/actions'
import palette from '../../assets/palette'
import { SCREEN_WIDTH, DEFAULT_PADDING } from '../../assets/dimension'
import { NavigationEvents } from 'react-navigation'

const TRANSLATE_Y = 10

class HomeScreen extends React.PureComponent {
  state = {
    refreshing: false,
    opacityAnimation: new Animated.Value(1),
    translateY: new Animated.Value(0)
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props
        .fetchDataThunk()
        .then(() => {
          this.scrollX.setValue(0)
          this.setState({ refreshing: false })
        })
        .catch(() => this.setState({ refreshing: false }))
    })
  }

  componentDidMount = () => {
    this._notificationSubscription = Notifications.addListener(notification =>
      _handleNotification(notification, this.props.navigation)
    )
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { id: item.id })
  }

  _renderNearbyItem = ({ item, index }) => {
    const { navigation } = this.props
    const props = { item, index, navigation }
    return <NearbyItem {...props} />
  }

  _renderPopularItem = ({ item, index }) => {
    const { navigation } = this.props
    const props = { item, index, navigation }
    return <PopularItem {...props} />
  }

  scrollX = new Animated.Value(0)

  _renderDots = nearbyData => {
    const dotPosition = Animated.divide(this.scrollX, SCREEN_WIDTH)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: DEFAULT_PADDING / 2,
          minHeight: 15
        }}
      >
        {nearbyData.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2, 0],
            extrapolate: 'clamp'
          })
          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 10, 8],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: 10,
                  marginHorizontal: 6,
                  backgroundColor: '#DCE0E9',
                  borderColor: '#007BFA',
                  borderWidth: borderWidth
                }
              ]}
            />
          )
        })}
      </View>
    )
  }

  render() {
    const { checkLoading, distanceMatrix, markerMatrix } = this.props
    let matrixData = []
    Object.entries(markerMatrix).forEach(([key, value]) => {
      matrixData.push(value)
    })

    const nearbyData = matrixData
      .filter(item => item.coordinate.latitude)
      .sort((itemA, itemB) => {
        if (distanceMatrix && distanceMatrix[itemA.id]) {
          return (
            distanceMatrix[itemA.id].distance -
            distanceMatrix[itemB.id].distance
          )
        }
        return true
      })
      .slice(0, 5)
    const popularData = matrixData
      .sort((itemA, itemB) => {
        return itemB.visitCount - itemA.visitCount
      })
      .slice(0, 10)

    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && (
          <NavigationEvents
            onDidFocus={() => {
              StatusBar.setBarStyle('dark-content')
            }}
          />
        )}
        <ScrollView
          scrollEnabled={checkLoading || !distanceMatrix ? false : true}
          refreshControl={
            <RefreshControl
              colors={[palette.primaryColorLight]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={palette.primaryColorLight}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <HeaderBar headerName="Home" />
          <View style={styles.nearbyView}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={styles.listTitle}>Nearby Sculptures</Text>
            </View>
            {checkLoading || !distanceMatrix ? (
              <View style={[styles.nearbyItemStyle]}>
                <Placeholder Animation={Fade}>
                  <PlaceholderMedia size="100%" style={{ borderRadius: 12 }} />
                </Placeholder>
                <View style={styles.fixedImageContentBox}>
                  <Placeholder Animation={Fade} style={{ paddingTop: 12 }}>
                    <PlaceholderLine width={20} />
                    <PlaceholderLine width={60} />
                    <PlaceholderLine width={40} />
                  </Placeholder>
                </View>
              </View>
            ) : (
              // <NearbyList
              //   data={nearbyData}
              //   _renderItem={this._renderNearbyItem}
              // />
              <FlatList
                horizontal
                data={nearbyData}
                keyExtractor={item => item.id.toString()}
                renderItem={this._renderNearbyItem}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                onScroll={Animated.event([
                  { nativeEvent: { contentOffset: { x: this.scrollX } } }
                ])}
              />
            )}
            {this._renderDots(nearbyData)}
          </View>
          <View style={[styles.popularList]}>
            <Text style={styles.listTitle}>Popular Sculptures</Text>
            {checkLoading || !distanceMatrix ? (
              <View
                style={{
                  flex: 1,
                  marginTop: 9,
                  marginLeft: 24,
                  flexDirection: 'row'
                }}
              >
                {[1, 2, 3].map(item => {
                  return (
                    <View
                      key={item}
                      style={[styles.imagePopularItem, { marginRight: 12 }]}
                    >
                      <Placeholder Animation={Fade}>
                        <PlaceholderMedia
                          size="100%"
                          style={{ borderRadius: 12 }}
                        />
                      </Placeholder>
                    </View>
                  )
                })}
              </View>
            ) : (
              <PopularList
                data={popularData}
                _renderItem={this._renderPopularItem}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => {
  const markerMatrix = getState.markerReducer.markerMatrix
  const isLoading = getState.markerReducer.isLoading
  const distanceMatrix = getState.distanceReducer.distanceMatrix
  const isLoadingUser = getState.markerReducer.isLoadingUser
  const loggedIn = getState.authReducer.loggedIn

  const checkLoading =
    (loggedIn && (isLoading || !isLoadingUser)) || (!loggedIn && isLoading)

  return {
    markerMatrix,
    distanceMatrix,
    checkLoading
  }
}

const mapDispatchToProps = {
  fetchDataThunk
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
