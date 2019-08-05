import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { localData } from '../../library/localData'
import images from '../../assets/images'
import styles from './styles'
import TitleCard from './TitleCard'
import FeatureCard from './FeatureCard'
import DescriptionCard from './DescriptionCard'
import MapCard from './MapCard'
import { CustomIcon } from '../../assets/icons'
import { LinearGradient } from 'expo-linear-gradient'
import { SCREEN_WIDTH } from '../../assets/dimension'

const localItem = localData[0]

class DetailScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  _navigateToMap = () => {
    this.props.navigation.navigate('Map')
  }

  render() {
    const item = this.props.navigation.getParam('item', localData[0])
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainImage}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            >
              <Image
                source={images.sculptures[item.photoURL]}
                resizeMode="cover"
                style={styles.imageItem}
              />
              <Image
                source={images.sculptures[item.photoURL + 1]}
                resizeMode="cover"
                style={styles.imageItem}
              />
            </ScrollView>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 56 - 24,
                padding: 24,
                borderRadius: 50,
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              <CustomIcon name="back" size={24} color="#fff" />
            </TouchableOpacity>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 1)']}
              style={styles.overlayImage}
            >
              <View>
                <Text style={styles.visitorsText}>100 visitors</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.detailContainer}>
            <MapCard item={item} _navigateToMap={this._navigateToMap} />
            <DescriptionCard item={item} />
            <FeatureCard item={item} />
            <TitleCard item={item} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default DetailScreen
