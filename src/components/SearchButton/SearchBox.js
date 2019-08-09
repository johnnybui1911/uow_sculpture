import React from 'react'
import { View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { icons } from '../../assets/icons'
import styles from './styles'
import palette from '../../assets/palette'

const SearchBox = props => (
  <View style={styles.searchBox}>
    <FontAwesome
      style={{ padding: 10 }}
      name="search"
      size={20}
      color={palette.primaryColorLight}
    />
    <TextInput
      value={props.searchText}
      onChange={e => props._handleSearch(e)}
      placeholder="Enter keywords..."
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        width: '100%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
      }}
    />
    {props.markerSelected ? (
      <TouchableWithoutFeedback
        onPress={() => {
          props._onMarkerUnPressed()
        }}
      >
        {icons.close}
      </TouchableWithoutFeedback>
    ) : (
      icons.micro
    )}
  </View>
)

export default SearchBox
