import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { Notifications } from 'expo'
import { FontAwesome } from '@expo/vector-icons'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import CardItem from './CardItem'
import SearchBox from '../../components/SearchButton/SearchBox'
import { _handleNotification } from '../../library/notificationTask'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import SearchView from '../../components/SearchButton/SearchView'

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
    return <CardItem item={item} index={index} />
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
    const { isLoading, markerMatrix } = this.props
    if (isLoading) {
      const array = [1, 2, 3, 4]
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
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      )
    }

    let matrixData = []
    Object.entries(markerMatrix).forEach(([key, value]) => {
      matrixData.push(value)
    })

    const { searchText, refreshing } = this.state
    let data = matrixData
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
        contentContainerStyle={{ paddingVertical: 6 }}
      />
    )
  }

  render() {
    const { searchText } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <HeaderBar headerName="Collection" />
          <SearchView
            customStyle={{ marginBottom: 0 }}
            navigateTo={() => this.props.navigation.navigate('Search')}
          />
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
  markerMatrix: getState.markerReducer.markerMatrix,
  markers: getState.markerReducer.markers,
  isLoading: getState.markerReducer.isLoading
})

export default connect(mapStateToProps)(CollectionScreen)
