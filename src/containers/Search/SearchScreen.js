import React from 'react'
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Keyboard,
  BackHandler,
  Platform,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import SearchBox from '../../components/SearchButton/SearchBox'
import { icons } from '../../assets/icons'
import SearchItem from './SearchItem'
import palette from '../../assets/palette'
import { shadowIOS } from '../../assets/rootStyles'

class SearchScreen extends React.PureComponent {
  state = {
    searchText: '',
    refreshing: false,
    shadowSearchBox: false
  }

  scrollY = new Animated.Value(0)

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    )
    const searchText = this.props.navigation.getParam('searchText', '')
    searchText !== '' && this.setState({ searchText })
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
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
    const { navigation } = this.props
    const _onMarkerPressed = navigation.getParam('_onMarkerPressed', null)
    const centerToMarker = navigation.getParam('centerToMarker', false)
    return (
      <SearchItem
        index={index}
        item={item}
        searchText={searchText}
        _onMarkerPressed={_onMarkerPressed}
        centerToMarker={centerToMarker}
      />
    )
  }

  _renderList = () => {
    const { isLoading, recentSearchList, markers, navigation } = this.props
    const { searchText, refreshing } = this.state
    const _onMarkerPressed = navigation.getParam('_onMarkerPressed', null) // reuse in Map Screen
    let validData = markers
    let data = []
    if (searchText.trim().length > 0) {
      data = validData.filter(item => {
        return (
          item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          item.features.maker.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1
        )
      })
    } else {
      data = recentSearchList
    }
    return (
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
          {
            useNativeDriver: true,
            listener: event => {
              if (Platform.OS === 'ios') {
                const y = event.nativeEvent.contentOffset.y
                if (y > 0 && !this.state.shadowSearchBox) {
                  this.setState({ shadowSearchBox: true })
                } else if (y <= 0 && this.state.shadowSearchBox) {
                  this.setState({ shadowSearchBox: false })
                }
              }
            }
          }
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
        keyboardShouldPersistTaps="always"
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
          return searchText === '' ? (
            <View
              style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 10 }}
            >
              <Text style={styles.flatListHeader}>RECENT</Text>
            </View>
          ) : null
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

    // shadow apply for search header box
    const shadowAnimation = this.scrollY.interpolate({
      inputRange: [0, 26],
      outputRange: [-4, 4],
      extrapolate: 'clamp'
    })
    // const checkShadow = shadowAnimation.__getValue() > 3
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.searchBoxContainer,
            Platform.OS === 'android' ? { elevation: shadowAnimation } : null,
            Platform.OS === 'ios' && {
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowRadius: 2,
              shadowOpacity: this.state.shadowSearchBox ? 0.15 : 0
            }
            // ? { ...shadowIOS }
            // : null
          ]}
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
                  paddingTop: 10,
                  paddingLeft: 14, //icon error real paddingleft 16
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
          onStartShouldSetResponderCapture={e => {
            const focusField = TextInput.State.currentlyFocusedField()
            if (focusField != null && e.nativeEvent.target != focusField) {
              TextInput.State.blurTextInput(
                TextInput.State.currentlyFocusedField()
              )
            }
          }}
        >
          {this._renderList()}
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => {
  const { markerMatrix, isLoading } = getState.markerReducer
  const { recentSearchList } = getState.searchReducer
  let markers = []
  Object.entries(markerMatrix).forEach(([key, value]) => {
    markers.push(value)
  })

  return {
    markers,
    isLoading,
    recentSearchList
  }
}

export default connect(mapStateToProps)(SearchScreen)
