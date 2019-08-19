import React from 'react'
import { SafeAreaView, Text, View, ScrollView, Button } from 'react-native'
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

  // _navigateToDetail = () => {
  //   console.log("navigate");
  //   this.props.navigation.navigate("Detail");
  // };

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
