import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import palette from '../../assets/palette'
import styles from './styles'
import VerticalDivider from './VerticalDivider'
import { withNavigation } from 'react-navigation'

const ProfileBox = ({ likes, comments, visited, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          flex: 1,
          maxHeight: 68,
          backgroundColor: palette.backgroundColorWhite,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginHorizontal: 16,
          borderRadius: 12
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Text style={[styles.title, { color: palette.primaryColorLight }]}>
            {likes}
          </Text>
          <Text
            style={[
              styles.description,
              { fontSize: 11, color: palette.primaryColor }
            ]}
          >
            LIKES
          </Text>
        </View>
        <VerticalDivider />
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Text style={[styles.title, { color: palette.primaryColorLight }]}>
            {comments}
          </Text>
          <Text
            style={[
              styles.description,
              { fontSize: 11, color: palette.primaryColor }
            ]}
          >
            COMMENTS
          </Text>
        </View>
        <VerticalDivider />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Visit')}>
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Text style={[styles.title, { color: palette.primaryColorLight }]}>
              {visited}
            </Text>
            <Text
              style={[
                styles.description,
                { fontSize: 11, color: palette.primaryColor }
              ]}
            >
              VISITED
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default withNavigation(ProfileBox)
