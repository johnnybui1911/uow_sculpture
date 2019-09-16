import React from 'react'
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import SearchBox from '../../components/SearchButton/SearchBox'
import { icons } from '../../assets/icons'
import SearchItem from './SearchItem'
import palette from '../../assets/palette'

class SearchScreen extends React.PureComponent {
  state = {
    searchText: '',
    refreshing: false
  }

  scrollY = new Animated.Value(0)

  _navigateToDetail = id => {
    this.props.navigation.navigate('Detail', { id })
  }

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text })
  }

  _onClosePressed = () => {
    this.setState({ searchText: '' })
    Keyboard.dismiss()
  }

  _renderItem = ({ item, index }) => {
    const { searchText } = this.state
    return (
      <SearchItem
        item={item}
        searchText={searchText}
        _navigateToDetail={this._navigateToDetail}
      />
    )
  }

  _renderList = () => {
    const { isLoading, recentSearchList } = this.props
    const { searchText, refreshing } = this.state
    let data = []
    if (searchText.trim().length > 0) {
      data = this.props.markers.filter(
        item =>
          item.name.toLowerCase().slice(0, searchText.length) ===
          searchText.toLowerCase()
      )
    } else {
      data = recentSearchList
    }
    return (
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingVertical: 10
          // borderWidth: 1,
          // borderColor: palette.borderGreyColor,
          // borderRadius: 4
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: palette.backgroundTabColor,
              marginLeft: 50 + 12,
              marginRight: 16
            }}
          />
        )}
        ListHeaderComponent={() => {
          return (
            <View style={{ flex: 1, paddingBottom: 5, paddingHorizontal: 10 }}>
              <Text style={styles.flatListHeader}>RECENT</Text>
            </View>
          )
        }}
      />
    )
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // fetch data again
        this.setState({
          refreshing: false
        })
      }
    )
  }

  render() {
    const { searchText } = this.state
    const shadowStyle = {
      elevation: 4,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.1
    }

    // shadow apply for search header box
    const shadowAnimation = this.scrollY.interpolate({
      inputRange: [0, 26],
      outputRange: [-4, 4],
      extrapolate: 'clamp'
    })

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[styles.searchBoxContainer, { elevation: shadowAnimation }]}
        >
          <SearchBox
            flat
            _handleSearch={this._handleSearch}
            searchText={searchText}
            _onClosePressed={this._onClosePressed}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}
            >
              <View
                style={{
                  padding: 10,
                  paddingBottom: 13,
                  width: 50
                }}
              >
                {icons.back_blue_light}
              </View>
            </TouchableWithoutFeedback>
          </SearchBox>
        </Animated.View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24
          }}
        >
          {this._renderList()}
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers,
  isLoading: getState.markerReducer.isLoading,
  recentSearchList: getState.searchReducer.recentSearchList
})

export default connect(mapStateToProps)(SearchScreen)
