import React from 'react'
import { View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { icons } from '../../assets/icons'
import styles from './styles'
import palette from '../../assets/palette'

const SearchBox = ({ searchText, _handleSearch, _onClosePressed }) => (
  <View style={styles.searchBox}>
    <FontAwesome
      style={{ padding: 10 }}
      name="search"
      size={20}
      color={palette.primaryColorLight}
    />
    <TextInput
      value={searchText}
      onChange={e => {
        _handleSearch(e)
      }}
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
    {searchText ? (
      <TouchableWithoutFeedback onPress={_onClosePressed}>
        {icons.close}
      </TouchableWithoutFeedback>
    ) : (
      icons.micro
    )}
  </View>
)

export default SearchBox
