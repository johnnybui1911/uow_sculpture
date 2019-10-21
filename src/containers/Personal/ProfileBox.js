/**
 * Description: Profile Box Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import palette from '../../assets/palette'
import styles from './styles'
import VerticalDivider from './VerticalDivider'
import { RectButton } from 'react-native-gesture-handler'

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
          marginHorizontal: 24,
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
        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Visit')}> */}
        <View
          style={{
            flex: 1
          }}
        >
          <RectButton onPress={() => navigation.navigate('Visit')}>
            <View
              accessible
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Text
                style={[styles.title, { color: palette.primaryColorLight }]}
              >
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
          </RectButton>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </View>
    </View>
  )
}

export default withNavigation(ProfileBox)
