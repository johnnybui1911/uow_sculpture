import React from 'react'
import { SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import CardItem from './CardItem'
import SearchBox from '../../components/SearchButton/SearchBox'

class CollectionScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchText: '',
      closed: false
    }
  }

  componentDidMount = () => {
    this.setState({ loading: false })
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { item })
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

  _renderItem = ({ item }) => {
    return <CardItem item={item} _navigateToDetail={this._navigateToDetail} />
  }

  _renderList = () => {
    const { searchText } = this.state
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
      />
    )
  }

  render() {
    const { searchText, loading } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <HeaderBar headerName="Collection" />
            <SearchBox
              _handleSearch={this._handleSearch}
              searchText={searchText}
              _onClosePressed={this._onClosePressed}
            />
            <View
              style={{
                flex: 1,
                marginHorizontal: 24
              }}
            >
              {this._renderList()}
            </View>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers
})

export default connect(mapStateToProps)(CollectionScreen)
