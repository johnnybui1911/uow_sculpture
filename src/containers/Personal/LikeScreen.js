import React from 'react'
import { SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { localData } from '../../library/localData'
import CardItem from '../Collection/CardItem'
// import CardItem from './CardItem'

class LikeScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount = () => {
    this.setState({ data: localData })
  }

  _renderItem = ({ item, index }) => {
    const { markerMatrix } = this.props
    const sculptureItem = markerMatrix[item.sculptureId]
    return <CardItem item={sculptureItem} index={index} />
  }

  _renderList = () => {
    // const { data } = this.state
    const { likeList } = this.props
    return (
      <FlatList
        data={likeList}
        keyExtractor={(item, index) => item.sculptureId.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      />
    )
  }

  render() {
    return <View style={{ flex: 1 }}>{this._renderList()}</View>
  }
}

const mapStateToProps = getState => ({
  likeList: getState.authReducer.likeList,
  markerMatrix: getState.markerReducer.markerMatrix
})

export default connect(mapStateToProps)(LikeScreen)
