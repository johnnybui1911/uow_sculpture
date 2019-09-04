import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import { Notifications } from 'expo'
import { FontAwesome } from '@expo/vector-icons'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import CardItem from './CardItem'
import SearchBox from '../../components/SearchButton/SearchBox'
import { _handleNotification } from '../../library/notificationTask'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'

class CollectionScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      closed: false,
      refreshing: false
    }
  }
  componentDidMount = () => {
    this._notificationSubscription = Notifications.addListener(notification =>
      _handleNotification(notification, this.props.navigation)
    )
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { id: item.id })
  }

  _navigateToComment = item => {
    this.props.navigation.navigate('Comment', { id: item.id })
  }

  _handleSearch = event => {
    const { closed } = this.state
    if (!closed) {
      const { text } = event.nativeEvent
      this.setState({ searchText: text.trim(), closed: false })
    }
  }

  _onClosePressed = () => {
    this.setState({ searchText: '', closed: true })
  }

  _renderItem = ({ item, index }) => {
    return (
      <CardItem
        item={item}
        index={index}
        _navigateToDetail={this._navigateToDetail}
        _navigateToComment={this._navigateToComment}
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

  _renderList = () => {
    const { isLoading } = this.props
    if (isLoading) {
      const array = [1, 2, 3]
      return (
        <FlatList
          data={array}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <CardItem
                isLoading
                item={item}
                index={index}
                _navigateToDetail={this._navigateToDetail}
              />
            )
          }}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
        />
      )
    }

    const { searchText, refreshing } = this.state
    let data = this.props.markers
    if (searchText !== '') {
      data = data.filter(
        item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
    }
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
      />
    )
  }

  render() {
    const { searchText } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <HeaderBar headerName="Collection" />
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Search')}
          >
            <View style={styles.searchBox}>
              <FontAwesome
                style={{ padding: 10 }}
                name="search"
                size={20}
                color={palette.primaryColorLight}
              />
              <View
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  paddingBottom: 10,
                  paddingLeft: 0,
                  width: '100%',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 14
                }}
              >
                <Text style={styles.placeholder}>Enter keywords...</Text>
              </View>
              {icons.micro}
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24
            }}
          >
            {this._renderList()}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers,
  isLoading: getState.markerReducer.isLoading
})

export default connect(mapStateToProps)(CollectionScreen)
