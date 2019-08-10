import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Animated
} from 'react-native'
import styles from './styles'
import { icons } from '../../assets/icons'
import images from '../../assets/images'

const { width } = Dimensions.get('window')
// default width 327
const PADDING = 12

class NearbyItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      popUp: false
    }

    this.animatedValue = new Animated.Value(1)
  }

  componentDidMount = () => {}

  onLikePress = () => {
    console.log('like')
    this.setState({ popUp: true }, () => this.fadeIn())
  }

  fadeIn = () => {
    this.animatedValue.setValue(1.15)
    Animated.timing(this.animatedValue, {
      toValue: 1
    }).start(() => {
      this.setState({ popUp: false })
    })
  }

  render() {
    const { item, navigation } = this.props
    return (
      <React.Fragment>
        {/* <TouchableWithoutFeedback> */}
        <View
          style={{
            width: width - PADDING * 2,
            height: 378,
            marginHorizontal: PADDING,
            paddingHorizontal: PADDING
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Detail', { item })}
          >
            <Image
              source={images.sculptures[item.photoURL]}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12
              }}
            />
          </TouchableWithoutFeedback>
          {this.state.popUp ? (
            <View
              style={{
                height: 378,
                width: width - PADDING * 2,
                position: 'absolute',
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Animated.View
                style={{
                  transform: [{ scale: this.animatedValue }]
                }}
              >
                {icons.like_fill_popup}
              </Animated.View>
            </View>
          ) : null}

          <View
            style={{
              position: 'absolute',
              top: 290,
              flexDirection: 'row',
              marginLeft: PADDING * 2, // trash fix, to be continued,
              zIndex: 2
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between'
                // backgroundColor: 'red'
              }}
            >
              <Text style={styles.title}>{item.distance} m</Text>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View
              style={{
                // backgroundColor: 'yellow',
                alignItems: 'center'
              }}
            >
              <TouchableWithoutFeedback onPress={this.onLikePress}>
                <Text style={[{ marginTop: 18 }]}>
                  {icons.like}
                  {/* {this.state.popUp ? icons.like_fill_white : icons.like} */}
                </Text>
              </TouchableWithoutFeedback>
              <Text style={[styles.like, { marginTop: 10 }]}>100</Text>
            </View>
          </View>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </React.Fragment>
    )
  }
}

export default NearbyItem
