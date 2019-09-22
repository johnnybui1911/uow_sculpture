import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import NearbyList from './NearbyList'
import PopularList from './PopularList'
import NearbyItem from './NearbyItem'
import PopularItem from './PopularItem'
import { _handleNotification } from '../../library/notificationTask'
import { fetchDataThunk } from '../../redux/actions'

class HomeScreen extends React.PureComponent {
  state = {
    refreshing: false
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props
        .fetchDataThunk()
        .then(() => {
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

  render() {
    const { isLoading, distanceMatrix, markerMatrix } = this.props
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
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <HeaderBar headerName="Home" />
          <View style={styles.nearbyView}>
            <Text style={styles.listTitle}>Nearby Sculptures</Text>
            {isLoading || !distanceMatrix ? (
              <View style={styles.nearbyItemStyle}>
                <Placeholder Animation={Fade}>
                  <PlaceholderMedia size="100%" style={{ borderRadius: 12 }} />
                </Placeholder>
              </View>
            ) : (
              <NearbyList
                data={nearbyData}
                _renderItem={this._renderNearbyItem}
              />
            )}
          </View>
          <View style={[styles.popularList]}>
            <Text style={styles.listTitle}>Popular Sculptures</Text>
            {isLoading || !distanceMatrix ? (
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

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix,
  isLoading: getState.markerReducer.isLoading,
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

const mapDispatchToProps = {
  fetchDataThunk
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
