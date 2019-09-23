import React from 'react'
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
  Loader
} from 'rn-placeholder'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import styles from './styles'
import palette from '../../assets/palette'
import formatDistance from '../../library/formatDistance'
import LikeComment from '../../components/LikeComment/LikeComment'

const CardItem = props => {
  const { item, index, isLoading = false, distanceMatrix, inProfile } = props

  const renderImage = () => {
    const { photoURL } = item
    if (!photoURL) {
      return (
        <View
          style={{
            flex: 1,
            width: 120,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
            borderRadius: 12
          }}
        >
          <Image
            source={images.empty_image}
            style={{ width: 120, height: 75 }}
            resizeMode="cover"
          />
        </View>
      )
    } else {
      return <Image source={{ uri: item.photoURL }} style={styles.image} />
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate('Detail', { id: item.id })}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 3,
          paddingTop: index === 0 ? 12 : 3
        }}
      >
        <View
          style={{
            ...styles.cardItem,
            alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start'
          }}
        >
          <View
            style={index % 2 === 0 ? styles.cardDesLeft : styles.cardDesRight}
          >
            {isLoading ? (
              <Placeholder
                Animation={Fade}
                style={{
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <PlaceholderLine width={20} />
                <PlaceholderLine width={60} />
                <PlaceholderLine width={80} />
                <PlaceholderLine width={40} />
              </Placeholder>
            ) : (
              <React.Fragment>
                <View

                // style={{ justifyContent: 'center' }}
                >
                  <Text style={styles.distance}>
                    {distanceMatrix && distanceMatrix[item.id]
                      ? formatDistance(distanceMatrix[item.id].distance)
                      : ''}
                  </Text>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.name}
                  </Text>

                  <Text style={[styles.description, { marginTop: 0 }]}>
                    {item.features.maker}
                  </Text>
                </View>
                {/* {!inProfile && ( */}
                <LikeComment markerId={item.id} style={{ marginBottom: -7 }} />
                {/* )} */}
              </React.Fragment>
            )}
          </View>
          <View
            style={[
              styles.imageContainer,
              index % 2 === 0 ? { left: 0 } : { right: 0 }
            ]}
          >
            {isLoading ? (
              <View style={styles.image}>
                <Placeholder Animation={Fade}>
                  <PlaceholderMedia size="100%" style={{ borderRadius: 12 }} />
                </Placeholder>
              </View>
            ) : (
              renderImage()
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const mapStateToProps = getState => ({
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

export default connect(mapStateToProps)(withNavigation(CardItem))
