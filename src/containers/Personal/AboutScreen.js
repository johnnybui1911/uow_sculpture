import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import FeatureCard from './FeatureCard'
import styles from './styles'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'

const AboutScreen = props => {
  const username = props.username || 'Cristiano Ronaldo'
  const email = props.email || 'cristiano@gmail.com'
  const joinDate = props.joinDate || new Date('October 13, 2014')
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: palette.backgroundColorWhite,
          padding: 24,
          justifyContent: 'center',
        }}
      >
        <FeatureCard email={email} joinDate={joinDate} />
        <View style={styles.button}>
          <View style={{ flex: 1, padding: 20 }}>{icons.google}</View>
          <View style={{ position: 'absolute', left: 60 }}>
            <Text style={[styles.title, { fontSize: 16 }]}>{username}</Text>
            <Text style={(styles.description, { fontSize: 12 })}>
              Account name
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.button]}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.title,
                {
                  color: palette.primaryColorLight,
                  fontSize: 16,
                  textAlign: 'center',
                },
              ]}
            >
              SIGN OUT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default AboutScreen
