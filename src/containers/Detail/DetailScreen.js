import React from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'
import { localData } from '../../library/localData'
import styles from './styles'
import TitleCard from './TitleCard'
import FeatureCard from './FeatureCard'
import DescriptionCard from './DescriptionCard'
import MapCard from './MapCard'
import Header from './Header'

const localItem = localData[0]

class DetailScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  _navigateToMap = () => {
    this.props.navigation.navigate('Map')
  }

  render() {
    const item = this.props.navigation.getParam('item', localItem)
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

export default DetailScreen
