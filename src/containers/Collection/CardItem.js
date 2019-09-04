import React from 'react'
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
  Loader
} from 'rn-placeholder'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import styles from './styles'
import LikeButton from './LikeButton'

const CardItem = props => {
  const {
    item,
    index,
    _navigateToDetail,
    _navigateToComment,
    isLoading = false
  } = props
  return (
    <TouchableWithoutFeedback onPress={() => _navigateToDetail(item)}>
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
              <View style={{}}>
                <Text style={styles.distance}>{item.distance}</Text>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
              >
                <Text style={styles.description}>{item.des}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  flexDirection: 'row'
                }}
              >
                <LikeButton />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: -5
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => _navigateToComment(item)}
                  >
                    <View style={{ padding: 5 }}>{icons.comment}</View>
                  </TouchableWithoutFeedback>
                  <Text style={styles.numberStyle}>2</Text>
                </View>
              </View>
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
            <Image
              source={images.sculptures[item.photoURL]}
              style={styles.image}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CardItem
