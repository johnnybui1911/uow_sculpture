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

const PersonalHeader = ({
  user,
  refreshing,
  _handleRefresh,
  likeUserCount,
  commentUserCount,
  visitUserCount,
  navigation
}) => {
  const { userId } = user
  return user ? (
    <View style={styles.profileFixedContainer}>
      {user.userId ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[palette.primaryColorLight]}
              refreshing={refreshing}
              onRefresh={_handleRefresh}
            />
          }
        >
          <View style={styles.headerContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Profile</Text>
            </View>
            {userId.split('|')[0].includes('auth0') && (
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate('EditProfile')}
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

            <View style={{ marginTop: 15 }}>
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
            likes={likeUserCount}
            comments={commentUserCount}
            visited={visitUserCount}
          />
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator color={palette.backgroundColorWhite} />
        </View>
      )}
    </View>
  ) : null
}

const mapStateToProps = getState => {
  const { user, commentList, visitList } = getState.authReducer
  const { markerMatrix } = getState.markerReducer
  let likeUserCount = 0
  Object.entries(markerMatrix).forEach(([key, value]) => {
    value.likeId && likeUserCount++
  })
  return {
    user,
    likeUserCount,
    commentUserCount: commentList.length,
    visitUserCount: visitList.length
  }
}

export default connect(mapStateToProps)(withNavigation(PersonalHeader))
