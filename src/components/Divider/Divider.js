/**
 * Description: Divider Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View } from 'react-native'
import styles from './styles'

const Divider = props => <View style={[styles.divider, { ...props.styles }]} />

export default Divider
