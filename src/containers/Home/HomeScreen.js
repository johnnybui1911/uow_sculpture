import React from 'react'
import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import NearbyList from './NearbyList'
import PopularList from './PopularList'
import { localData } from '../../library/localData'
import NearbyItem from './NearbyItem'
import PopularItem from './PopularItem'

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    this._notificationSubscription = await Notifications.addListener(
      this._handleNotification
    )
  }

  _handleNotification = notification => {
    if (notification.origin === 'selected' && notification.data.screen) {
      this._navigateToDetail(
        localData.find(item => item.id === notification.data.id)
      )
    }
    console.log('Notification selected and navigated to Detail')
    console.log(notification)
    console.log(notification.data)
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { item })
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
    const data = this.props.markers
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBar headerName="Home" />
          <View>
            <Text style={styles.listTitle}>Nearby Sculptures</Text>
            <NearbyList data={data} _renderItem={this._renderNearbyItem} />
          </View>
          <View style={[styles.popularList]}>
            <Text style={styles.listTitle}>Popular Sculptures</Text>
            <PopularList data={data} _renderItem={this._renderPopularItem} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers
})

export default connect(mapStateToProps)(HomeScreen)
