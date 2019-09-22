import React from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import palette from '../../assets/palette'
import styles from './styles'
import { icons } from '../../assets/icons'

const SearchView = ({
  navigation,
  searchText = '',
  customStyle,
  _onClosePressed,
  navigateTo
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigateTo()}>
      <View style={[styles.searchBox, { ...customStyle }]}>
        <View
          style={{
            paddingLeft: 16,
            width: 50
          }}
        >
          <FontAwesome
            name="search"
            size={20}
            color={palette.primaryColorLight}
          />
        </View>

        <View
          style={{
            flex: 1,
            // paddingVertical: 16,
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.placeholder,
              {
                color:
                  searchText !== ''
                    ? palette.primaryColor
                    : palette.secondaryTypographyColor
              }
            ]}
          >
            {searchText !== '' ? searchText : 'Enter keywords...'}
          </Text>
        </View>
        {searchText !== '' ? (
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
    </TouchableWithoutFeedback>
  )
}

export default withNavigation(SearchView)
