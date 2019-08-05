import React from 'react'
import { SafeAreaView, Text, View, ScrollView, Button } from 'react-native'
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
    this.state = {
      data: [],
    }
  }

  componentDidMount = () => {
    this.setState({ data: localData })
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
    const { data } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBar headerName="Home" />
          <View style={styles.nearbyList}>
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

export default HomeScreen
