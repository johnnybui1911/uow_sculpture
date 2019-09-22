import React from 'react'
import { SafeAreaView, View, ScrollView, BackHandler } from 'react-native'
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
  static defaultProps = {
    item: {
      id: 1,
      name: 'Winged Figure',
      distance: 500,
      duration: 5,
      des: 'Western side of Robsons Road',
      features: {
        date: '1988-1989',
        maker: 'Bert Flugelman',
        material: 'Stainless steel'
      },
      description: {
        location:
          'Main campus, on UOW land on the western side of  Robsons Road, Keiraville. Walking track entry from corner of Robsons Road and  Northfields Avenue',
        creditLine:
          'Commissioned by the Friends of the University of Wollongong in celebration of the Australian Bicentenary, 1988'
      },
      photoURL:
        'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1987.08/IMG_2477.JPG',
      coordinate: {
        latitude: -34.40478,
        longitude: 150.88115
      },
      imageList: []
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
    this._notificationSubscription = Notifications.addListener(notification =>
      _handleNotification(notification, this.props.navigation)
    )
  }

  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  _navigateToMap = () => {
    this.props.navigation.navigate('Map')
  }

  _navigateToComment = () => {
    const id = this.props.navigation.getParam('id', 2015.003)
    this.props.navigation.navigate('Comment', { id: id })
  }

  render() {
    const id = this.props.navigation.getParam('id', 2015.003)
    const item = this.props.markerMatrix[id]
    const { imageList } = item

    return (
      <SafeAreaView style={styles.container}>
        {item ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailContainer}>
              {item.coordinate.latitude ? (
                <MapCard
                  item={item}
                  _navigateToMap={this._navigateToMap}
                  elevation={2}
                />
              ) : null}
              <DescriptionCard item={item} elevation={3} />
              <FeatureCard item={item} elevation={4} />
              <TitleCard
                _navigateToComment={this._navigateToComment}
                item={item}
                elevation={5}
              />
              <Header
                item={item}
                imageList={imageList}
                navigation={this.props.navigation}
              />
            </View>
          </ScrollView>
        ) : null}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix
})

export default connect(mapStateToProps)(DetailScreen)
