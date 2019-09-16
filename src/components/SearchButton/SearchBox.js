import React from 'react'
import { View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { icons } from '../../assets/icons'
import styles from './styles'
import palette from '../../assets/palette'

const SearchBox = ({
  flat = false,
  searchText,
  _handleSearch,
  _onClosePressed,
  children
}) => (
  <View style={flat ? styles.searchBoxFlat : styles.searchBox}>
    {flat ? (
      children
    ) : (
      <View
        style={{
          alignItems: 'center',
          width: 50
        }}
      >
        <FontAwesome
          style={{ padding: 0 }}
          name="search"
          size={20}
          color={palette.primaryColorLight}
        />
      </View>
    )}
    <TextInput
      autoFocus={flat}
      value={searchText}
      onChange={e => {
        _handleSearch(e)
      }}
      placeholder="Enter keywords..."
      style={{
        flex: 1,
        // paddingVertical: 10,
        // paddingBottom: 10,,
        paddingHorizontal: 12,
        width: '100%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: palette.primaryColor
      }}
      placeholderTextColor={palette.secondaryTypographyColor}
    />
    {searchText ? (
      <TouchableWithoutFeedback onPress={_onClosePressed}>
        <View
          style={{
            width: 50,
            alignItems: 'flex-end',
            padding: 16
          }}
        >
          {icons.close}
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback>
        <View
          style={{
            width: 50,
            alignItems: 'flex-end',
            padding: 16
          }}
        />
      </TouchableWithoutFeedback>
    )}
  </View>
)

export default SearchBox
