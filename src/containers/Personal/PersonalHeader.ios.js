import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import ImageViewer from 'react-native-image-zoom-viewer'
import styles from './styles'
import palette from '../../assets/palette'
import images from '../../assets/images'
import ProfileBox from './ProfileBox'
import {
  HEADER_BAR_MARGIN_TOP,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from '../../assets/dimension'
import { icons } from '../../assets/icons'
import BlackModal from '../../components/BlackModal/BlackModal'

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

  const [loadingImage, setLoadingImage] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false)

  const openImageViewer = () => {
    setModalVisible(true)
    StatusBar.setBarStyle('dark-content')
  }

  const closeImageViewer = () => {
    setModalVisible(false)
    StatusBar.setBarStyle('light-content')
  }

  return loggedIn ? (
    <View style={[styles.profileFixedContainer]}>
      {modalVisible && <BlackModal opacity={1} />}
      <Modal visible={modalVisible} transparent>
        <ImageViewer
          imageUrls={[
            {
              url: user.picture,
              height: SCREEN_WIDTH,
              width: SCREEN_HEIGHT,
              props: {
                resizeMode: 'cover'
              }
            }
          ]}
          enableImageZoom
          enableSwipeDown
          onCancel={closeImageViewer}
          renderIndicator={(currentIndex, allSize) => (
            <View
              style={{
                position: 'absolute',
                top: 0,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                zIndex: 1
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end'
                }}
              >
                <TouchableWithoutFeedback onPress={closeImageViewer}>
                  <View
                    style={{
                      padding: 24
                    }}
                  >
                    {icons.close_w}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        />
      </Modal>
      <View style={[styles.headerContainer]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        {userId && userId.split('|')[0].includes('auth0') && (
          <TouchableOpacity
            style={[styles.box]}
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
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center'
          // paddingVertical: 15
        }}
      >
        <TouchableOpacity
          onPress={openImageViewer}
          style={{
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100 / 2,
            backgroundColor: palette.secondaryTypographyColor,
            overflow: 'hidden'
          }}
        >
          <View>
            <Image
              source={{ uri: user.picture }}
              style={{ height: 100, width: 100 }}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
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
