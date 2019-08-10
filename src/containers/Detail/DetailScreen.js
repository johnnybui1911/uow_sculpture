import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { localData } from '../../library/localData'
import images from '../../assets/images'
import styles from './styles'
import TitleCard from './TitleCard'
import FeatureCard from './FeatureCard'
import DescriptionCard from './DescriptionCard'
import MapCard from './MapCard'
import { CustomIcon } from '../../assets/icons'
import { SCREEN_WIDTH } from '../../assets/dimension'

const localItem = localData[0]

const localImages = [1, 2, 3]

class DetailScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  _navigateToMap = () => {
    this.props.navigation.navigate('Map')
  }

  _renderHeaderImage = photoURL => {
    return (
      <View style={styles.headerImage}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {localImages.map(index => {
            return (
              <View key={index}>
                <Image
                  source={images.sculptures[index]}
                  resizeMode="cover"
                  style={styles.imageItem}
                />
              </View>
            )
          })}
        </ScrollView>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.goBack()}
        >
          <View
            style={{
              position: 'absolute',
              top: 56 - 24,
              padding: 24,
              borderRadius: 50
            }}
          >
            <CustomIcon name="back" size={24} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 1)']}
          style={styles.overlayImage}
        >
          <View>
            <Text style={styles.visitorsText}>100 visitors</Text>
          </View>
        </LinearGradient>
      </View>
    )
  }

  render() {
    const item = this.props.navigation.getParam('item', localItem)
    const { photoURL } = item
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
            {this._renderHeaderImage(photoURL)}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default DetailScreen
