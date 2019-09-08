import React from 'react'
import { View, TouchableWithoutFeedback, Text, Animated } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../../assets/icons'
import FormDirection from './FormDirection'
import { SearchBox, MidDivider } from '../../../components'

class Header extends React.PureComponent {
  componentDidMount = () => {
    Animated.sequence([
      Animated.timing(this._translateY_SearchBox, {
        toValue: 0,
        duration: 400
      })
    ]).start()
  }

  componentDidUpdate = () => {
    const {
      showSteps,
      searchText,
      showDirection,
      selectedMarker,
      _handleSearch,
      _onClosePressed,
      _handleShowDirection,
      showMapOnly
    } = this.props
    if (!showMapOnly) {
      if (showDirection && !showSteps) {
        Animated.sequence([
          Animated.timing(this._translateY_SearchBox, {
            toValue: -100,
            duration: 400
          }),
          Animated.timing(this._translateY_DirectionForm, {
            toValue: 0,
            duration: 400
          })
        ]).start()
      } else if (showDirection && showSteps) {
        Animated.sequence([
          Animated.timing(this._translateY_DirectionForm, {
            toValue: -500,
            duration: 400
          })
        ]).start()
      } else {
        Animated.sequence([
          Animated.timing(this._translateY_DirectionForm, {
            toValue: -500,
            duration: 400
          }),
          Animated.timing(this._translateY_SearchBox, {
            toValue: 0,
            duration: 400
          })
        ]).start()
      }
    } else {
      Animated.parallel([
        Animated.timing(this._translateY_DirectionForm, {
          toValue: -500,
          duration: 400
        }),
        Animated.timing(this._translateY_SearchBox, {
          toValue: -100,
          duration: 400
        })
      ]).start()
    }
  }

  _translateY_SearchBox = new Animated.Value(-100)
  _translateY_DirectionForm = new Animated.Value(-500)

  _goBack = () => {
    this.props._handleShowDirection(false)
  }

  render() {
    const {
      showSteps,
      searchText,
      showDirection,
      selectedMarker,
      _handleSearch,
      _onClosePressed,
      _handleShowDirection
    } = this.props

    // if (showDirection) {
    //   if (!showSteps) {
    //     const destination = selectedMarker.name
    //     return (
    //       <View style={styles.formDirectionStyle}>
    //         <View style={styles.rowStyle}>
    //           <View style={styles.backButtonContainerStyle}>
    //             <TouchableWithoutFeedback onPress={this._goBack}>
    //               <View style={styles.backButtonStyle}>{icons.back_blue}</View>
    //             </TouchableWithoutFeedback>
    //           </View>
    //           <FormDirection destination={destination} />
    //           <TouchableWithoutFeedback>
    //             <View
    //               style={{
    //                 padding: 12,
    //                 borderRadius: 50
    //               }}
    //             >
    //               {icons.exchange}
    //             </View>
    //           </TouchableWithoutFeedback>
    //         </View>
    //         <MidDivider>
    //           <View style={styles.walkingBox}>
    //             {icons.walking}
    //             <Text style={styles.title_sm}>
    //               {selectedMarker.duration} min
    //             </Text>
    //           </View>
    //         </MidDivider>
    //       </View>
    //     )
    //   }
    //   return null
    // }
    return (
      <React.Fragment>
        <Animated.View
          style={[
            styles.formDirectionStyle,
            {
              height: 171,
              transform: [{ translateY: this._translateY_DirectionForm }]
            }
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.searchBoxContainer,
            { transform: [{ translateY: this._translateY_SearchBox }] }
          ]}
        >
          <SearchBox
            _handleSearch={_handleSearch}
            searchText={searchText}
            _onClosePressed={_onClosePressed}
          />
        </Animated.View>
      </React.Fragment>
    )
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Header)
