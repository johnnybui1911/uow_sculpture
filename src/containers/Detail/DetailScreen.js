/**
 * Description: Detail Screen
 * Author: Nam Bui
 **/

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
import BlackModal from '../../components/BlackModal/BlackModal'

// const localItem = localData[0]

class DetailScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  state = {
    modalVisible: false
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.modalVisible) {
        this.setState({ modalVisible: false })
        return true
      }
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

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  _navigateToMap = () => {
    this.props.navigation.navigate('Map')
  }

  _navigateToComment = () => {
    const id = this.props.navigation.getParam('id', 1986.058)
    this.props.navigation.navigate('Comment', { id: id })
  }

  render() {
    const id = this.props.navigation.getParam('id', 1986.058)
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
                modalVisible={this.state.modalVisible}
                setModalVisible={this.setModalVisible}
                item={item}
                imageList={imageList}
                navigation={this.props.navigation}
              />
            </View>
          </ScrollView>
        ) : null}
        {this.state.modalVisible && <BlackModal opacity={1} />}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix
})

export default connect(mapStateToProps)(DetailScreen)
