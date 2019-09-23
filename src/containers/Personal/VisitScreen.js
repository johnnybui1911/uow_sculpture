import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableHighlight,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import styles from './styles'
import images from '../../assets/images'
import DividerLight from '../../components/Divider/DividerLight'
import { MIN_TABVIEW_HEIGHT, STATUS_BAR_HEIGHT } from '../../assets/dimension'
import palette from '../../assets/palette'
import { icons } from '../../assets/icons'
import baseAxios from '../../library/api'
class VisitScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: false,
      visitList: []
    }
  }

  componentDidMount = () => {
    this._fetchData()
  }

  _fetchData = () => {
    const { userId } = this.props
    baseAxios
      .get(`visit/user-id/${userId}`)
      .then(res => {
        const resData = res.data.map(element => {
          const {
            visitId,
            user: { userId, picture },
            sculpture: { accessionId, images, name },
            visitTime
          } = element
          return {
            visitId,
            userId,
            sculptureId: accessionId,
            sculptureName: name,
            photoURL: images[0].url,
            submitDate: visitTime
          }
        })

        this.setState({
          visitList: resData,
          isLoading: false,
          refreshing: false
        })
      })
      .catch(res => {
        this.setState({ isLoading: false, refreshing: false })
      })
  }

  _renderItem = ({ item }) => {
    const { username } = this.props
    const { submitDate, photoURL, sculptureName, sculptureId } = item
    return (
      <TouchableHighlight
        underlayColor="#FAFAFA"
        onPress={() =>
          this.props.navigation.navigate('Detail', { id: sculptureId })
        }
        style={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <View style={[]}>
            <Image
              source={photoURL ? { uri: photoURL } : images.empty_image}
              style={{
                width: 60,
                height: 60,
                borderRadius: 4,
                backgroundColor: palette.backgroundTabColor
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: 12
            }}
          >
            <Text style={[styles.title, { fontSize: 14 }]}>
              {sculptureName}
            </Text>
            <Text
              style={[
                styles.description,
                { fontSize: 13, color: 'rgb(136,136,136)' }
              ]}
            >
              Visited time: {moment(submitDate).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderList = () => {
    const { refreshing, visitList } = this.state
    return (
      <FlatList
        data={visitList.sort((a, b) => {
          return (
            new Date(b.submitDate).getTime() - new Date(a.submitDate).getTime()
          )
        })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={[styles.flatList, { marginTop: -12 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <DividerLight
            style={{ backgroundColor: 'rgba(0,0,0,0.15)', marginVertical: 0 }}
          />
        )}
        refreshControl={
          <RefreshControl
            colors={[palette.primaryColorLight]}
            refreshing={refreshing}
            onRefresh={this._handleRefresh}
          />
        }
        // contentContainerStyle={{ paddingHorizontal: 24 }}
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
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: STATUS_BAR_HEIGHT + 12,
            paddingHorizontal: 24,
            paddingBottom: 12,
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: '#FAFAFA',
            marginBottom: 12,
            elevation: 2
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}
          >
            <View
              style={{
                width: 50,
                justifyContent: 'center',
                paddingBottom: 4 + 1
              }}
            >
              {icons.back_blue({ size: 18 })}
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              //   paddingLeft: 12,
              paddingBottom: 3
              // alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: palette.primaryTypographyColor,
                fontFamily: 'Montserrat-Medium'
              }}
            >
              Visits
            </Text>
          </View>
        </View>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <ActivityIndicator color={palette.primaryColorLight} size="large" />
          </View>
        ) : (
          this._renderList()
        )}
      </View>
    )
  }
}

const mapStateToProps = getState => ({
  username: getState.authReducer.user.username,
  userId: getState.authReducer.user.userId
})

export default connect(mapStateToProps)(VisitScreen)
