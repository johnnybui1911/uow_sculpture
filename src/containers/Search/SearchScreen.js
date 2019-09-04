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
import DividerLight from '../../components/Divider/DividerLight'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

class SearchScreen extends React.PureComponent {
  state = {
    searchText: '',
    closed: false,
    refreshing: false,
    shadow: false
  }

  scrollY = new Animated.Value(0)

  _handleSearch = event => {
    const { closed } = this.state
    // if (!closed) {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim(), closed: false })
    // }
  }

  _onClosePressed = () => {
    this.setState({ searchText: '', closed: true })
    Keyboard.dismiss()
  }

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={[]}>{icons.clock}</View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 12
          }}
        >
          <Text style={[styles.title]}>{item.name}</Text>
          <Text style={[styles.description]}>{item.features.maker}</Text>
        </View>
        <View style={[]}>{icons.noun_arrow}</View>
      </View>
    )
  }

  _renderList = () => {
    const { isLoading } = this.props
    const { searchText, refreshing } = this.state
    let data = this.props.markers
    if (searchText !== '') {
      data = data.filter(
        item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
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
        keyExtractor={item => item.id.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
        contentContainerStyle={{ padding: 18 }}
        ItemSeparatorComponent={() => (
          <View style={{ marginLeft: 43 }}>
            <DividerLight />
          </View>
        )}
        ListHeaderComponent={() => {
          return (
            <View style={{ flex: 1, paddingBottom: 18 }}>
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
              {icons.back_blue_light}
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
  isLoading: getState.markerReducer.isLoading
})

export default connect(mapStateToProps)(SearchScreen)
