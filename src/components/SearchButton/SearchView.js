import React from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import palette from '../../assets/palette'
import styles from './styles'

const SearchView = ({ navigation, searchText = '' }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
      <View style={styles.searchBox}>
        <View
          style={{
            alignItems: 'center',
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
            paddingVertical: 16,
            width: '100%',
            fontFamily: 'Montserrat-Medium',
            fontSize: 14
          }}
        >
          <Text
            style={[
              styles.placeholder,
              {
                color:
                  searchText.trim() !== ''
                    ? palette.primaryColor
                    : palette.secondaryTypographyColor
              }
            ]}
          >
            {searchText.trim() !== '' ? searchText : 'Enter keywords..'}.
          </Text>
        </View>
        <View
          style={{
            width: 50,
            alignItems: 'flex-end'
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default withNavigation(SearchView)
