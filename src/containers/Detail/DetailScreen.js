import React from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Notifications } from 'expo'
import { localData } from '../../library/localData'
import styles from './styles'
import TitleCard from './TitleCard'
import FeatureCard from './FeatureCard'
import DescriptionCard from './DescriptionCard'
import MapCard from './MapCard'
import Header from './Header'
import { _handleNotification } from '../../library/notificationTask'

// const localItem = localData[0]

class DetailScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this._notificationSubscription = Notifications.addListener(notification =>
      _handleNotification(notification, this.props.navigation)
    )
  }

  _navigateToMap = () => {
    this.props.navigation.navigate('Map')
  }

  render() {
    const id = this.props.navigation.getParam('id', 0)
    const item = this.props.markers.find(item => item.id === id)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailContainer}>
            <MapCard
              item={item}
              _navigateToMap={this._navigateToMap}
              elevation={2}
            />
            <DescriptionCard item={item} elevation={3} />
            <FeatureCard item={item} elevation={4} />
            <TitleCard item={item} elevation={5} />
            <Header navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers
})

export default connect(mapStateToProps)(DetailScreen)
