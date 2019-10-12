import React from 'react'
import { View, Image, Text, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import styles from '../styles'
import palette from '../../../assets/palette'
import images from '../../../assets/images'

const Comment = ({ item, navigation }) => {
  const { text, submitDate, photoURL } = item
  return (
    <TouchableHighlight
      underlayColor={palette.onPressColor}
      onPress={() => navigation.navigate('Detail', { id: item.sculptureId })}
      style={{ paddingHorizontal: 24, paddingVertical: 12 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <View style={[]}>
          <Image
            source={photoURL ? { uri: photoURL } : images.empty_image}
            style={{
              width: 60,
              height: 60,
              borderRadius: 4,
              backgroundColor: palette.backgroundTabColor
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 12
          }}
        >
          <Text style={[styles.title, { fontSize: 14 }]}>
            {item.sculptureName}
          </Text>
          <Text
            style={[
              styles.description_cmt,
              { marginBottom: 3, fontSize: 14, opacity: 0.9 }
            ]}
          >
            {text}
          </Text>
          <Text
            style={[
              styles.description,
              { fontSize: 13, color: 'rgb(136,136,136)' }
            ]}
          >
            {moment(submitDate)
              .fromNow()
              .includes('few seconds')
              ? 'Just now'
              : moment(submitDate).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default withNavigation(Comment)
