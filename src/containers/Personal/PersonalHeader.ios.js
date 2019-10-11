import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import styles from './styles'
import palette from '../../assets/palette'
import images from '../../assets/images'
import ProfileBox from './ProfileBox'
import { HEADER_BAR_MARGIN_TOP } from '../../assets/dimension'

const PersonalHeader = ({
  user,
  loggedIn,
  refreshing,
  _handleRefresh,
  isLoadingUser,
  likeUserCount,
  commentUserCount,
  visitUserCount,
  navigation
}) => {
  const { userId } = user
  const [likeCount, setLikeCount] = React.useState(likeUserCount)
  React.useEffect(() => {
    if (isLoadingUser) {
      setLikeCount(likeUserCount)
    }
  }, [likeUserCount, isLoadingUser])
  return loggedIn ? (
    <View style={[styles.profileFixedContainer]}>
      <View style={[styles.headerContainer]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        {userId && userId.split('|')[0].includes('auth0') && (
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              navigation.navigate('EditProfile')
            }}
          >
            <Text style={styles.titleButton}>EDIT</Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 15
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100 / 2,
            backgroundColor: palette.primaryColor,
            overflow: 'hidden'
          }}
        >
          <Image
            source={{ uri: user.picture }}
            style={{ height: 100, width: 100 }}
            resizeMode="cover"
          />
        </View>

        <View style={{ marginVertical: 15 }}>
          <Text
            style={[
              styles.title,
              { fontSize: 24, color: palette.backgroundColorWhite }
            ]}
          >
            {!user.username ? null : user.username}
          </Text>
        </View>
      </View>
      <ProfileBox
        likes={likeCount}
        comments={commentUserCount}
        visited={visitUserCount}
      />
    </View>
  ) : null
}

const mapStateToProps = getState => {
  const { user, commentList, visitList, loggedIn } = getState.authReducer
  const { markerMatrix, isLoadingUser } = getState.markerReducer
  let likeUserCount = 0
  Object.entries(markerMatrix).forEach(([key, value]) => {
    value.likeId && likeUserCount++
  })
  return {
    user,
    loggedIn,
    isLoadingUser,
    likeUserCount,
    commentUserCount: commentList.length,
    visitUserCount: visitList.length
  }
}

export default connect(mapStateToProps)(withNavigation(PersonalHeader))
