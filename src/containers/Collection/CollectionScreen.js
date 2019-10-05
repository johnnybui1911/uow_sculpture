import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  RefreshControl
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
import { fetchDataThunk } from '../../redux/actions'

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
        this.props
          .fetchDataThunk()
          .then(() => {
            this.setState({ refreshing: false })
          })
          .catch(() => this.setState({ refreshing: false }))
      }
    )
  }

  _renderList = () => {
    const { isLoading, markerMatrix, loggedIn, isLoadingUser } = this.props
    // if (
    //   (loggedIn && (isLoading || !isLoadingUser)) ||
    //   (!loggedIn && isLoading)
    // ) {

    let matrixData = []
    Object.entries(markerMatrix).forEach(([key, value]) => {
      matrixData.push(value)
    })
    if (!matrixData.length) {
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
          ListHeaderComponent={() => {
            return (
              <View style={{ flex: 1 }}>
                <HeaderBar headerName="Collection" />
                <SearchView
                  customStyle={{ marginBottom: 0 }}
                  navigateTo={() => this.props.navigation.navigate('Search')}
                />
              </View>
            )
          }}
        />
      )
    }

    const { searchText, refreshing } = this.state
    let data = matrixData
    if (searchText !== '') {
      data = data.filter(
        item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
    }
    return (
      <FlatList
        data={data.sort((itemA, itemB) => {
          return itemA.name > itemB.name
        })}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            colors={[palette.primaryColorLight]}
            refreshing={refreshing}
            onRefresh={this._handleRefresh}
          />
        }
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingVertical: 6 }}
        ListHeaderComponent={() => {
          return (
            <View style={{ flex: 1 }}>
              <HeaderBar headerName="Collection" />
              <SearchView
                customStyle={{ marginBottom: 0 }}
                navigateTo={() => this.props.navigation.navigate('Search')}
              />
            </View>
          )
        }}
      />
    )
  }

  render() {
    const { searchText } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <View
            style={{
              flex: 1,
              paddingHorizontal: 24
            }}
          > */}
          {this._renderList()}
          {/* </View> */}
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markerMatrix: getState.markerReducer.markerMatrix,
  isLoading: getState.markerReducer.isLoading,
  isLoadingUser: getState.markerReducer.isLoadingUser,
  loggedIn: getState.authReducer.loggedIn
})

const mapDispatchToProps = {
  fetchDataThunk
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScreen)
