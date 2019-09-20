import React from 'react'
import { View, FlatList, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import styles from './styles'
import images from '../../assets/images'
import DividerLight from '../../components/Divider/DividerLight'
import { icons } from '../../assets/icons'
import { FontAwesome } from '@expo/vector-icons'
import palette from '../../assets/palette'
import Header from './Header'
import { withNavigation } from 'react-navigation'

class CommentList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // comments: [],
      loading: true,
      refreshing: false
    }
  }

  // componentDidMount = () => {
  //   this._fetchData()
  // }

  // _fetchData = () => {
  //   if (this.props.comments) {
  //     // const { comments } = this.props
  //     // comments.sort((a, b) => {
  //     //   return b.submitDate - a.submitDate
  //     // })

  //     this.setState({
  //       refreshing: false,
  //       loading: false
  //     })
  //   }
  // }

  _handleLoadMore = () => {
    // console.log('End Reached')
  }

  _renderItem = ({ item }) => {
    const photoURL = null
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <View style={[]}>
          {photoURL ? (
            <Image
              source={images.profile}
              style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                backgroundColor: palette.secondaryTypographyStrongColor,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Text style={[styles.title, { color: '#FFF' }]}>
                {item.userId.toUpperCase().charAt(0)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 12
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end'
            }}
          >
            <Text style={[styles.title, { fontSize: 16 }]}>{item.userId}</Text>
            <FontAwesome
              name="circle"
              size={3}
              color={palette.secondaryTypographyColor}
              style={{ paddingHorizontal: 6, paddingBottom: 7 }}
            />
            <Text
              style={[styles.description, { fontSize: 12, paddingBottom: 1 }]}
            >
              {moment(item.submitDate)
                .fromNow()
                .includes('a few seconds ago')
                ? 'Just now'
                : moment(item.submitDate).fromNow()}
            </Text>
          </View>
          <Text style={[styles.description_cmt, { marginBottom: 3 }]}>
            {item.text}
          </Text>
        </View>
      </View>
    )
  }

  _renderList = () => {
    const { refreshing } = this.state
    const { comments } = this.props
    return (
      <FlatList
        ref={scroll => (this.flatCommentList = scroll)}
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 12 }} />}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 60 + 24
        }}
        ListHeaderComponentStyle={{ marginHorizontal: -24 }}
        ListHeaderComponent={() => {
          return (
            <View style={{ flex: 1 }}>
              {/* <Header /> */}
              <View
                style={{
                  flex: 1,
                  paddingVertical: 18,
                  paddingHorizontal: 24,
                  paddingTop: 18 + 6 // if no header rendered
                }}
              >
                <Text style={styles.flatListHeader}>Comments</Text>
              </View>
            </View>
          )
        }}
        onEndReachedThreshold={0.5}
        onEndReached={this._handleLoadMore}
      />
    )
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () =>
        this.setState({
          refreshing: false
        })
    )
  }

  render() {
    const { loading } = this.state
    return <View style={{ flex: 1 }}>{this._renderList()}</View>
  }
}

export default CommentList
