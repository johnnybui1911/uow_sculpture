import React from 'react'
import { SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'
import LottieView from 'lottie-react-native'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import { localData } from '../../library/localData'
import CardItem from './CardItem'
import SearchBox from '../../components/SearchButton/SearchBox'

class CollectionScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      searchText: ''
    }
  }

  componentDidMount = () => {
    this.setState({ data: localData, loading: false })
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { item })
  }

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim() })
  }

  _renderItem = ({ item }) => {
    return <CardItem item={item} _navigateToDetail={this._navigateToDetail} />
  }

  _renderList = () => {
    const { searchText } = this.state
    let { data } = this.state
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

export default CollectionScreen
