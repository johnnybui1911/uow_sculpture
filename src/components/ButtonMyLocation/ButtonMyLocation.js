/**
 * Description: Custom My Location Button
 * Author: Nam Bui
 **/

import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { icons } from '../../assets/icons'
import styles from './styles'

export default props => {
  return (
    <TouchableWithoutFeedback onPress={props._centerUserLocation}>
      <View style={styles.button_my_location}>
        {props.centered ? icons.my_location_f : icons.my_location}
      </View>
    </TouchableWithoutFeedback>
  )
}
