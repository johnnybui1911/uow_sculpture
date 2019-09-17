import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import palette from '../../assets/palette'
import images from '../../assets/images'
import ProfileBox from './ProfileBox'

const PersonalHeader = ({ user }) => {
  return user ? (
    <View style={styles.profileFixedContainer}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.titleButton}>EDIT</Text>
        </TouchableOpacity>
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
          <Image source={images.profile} resizeMode="center" />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text
            style={[
              styles.title,
              { fontSize: 24, color: palette.backgroundColorWhite }
            ]}
          >
            {user.username}
          </Text>
        </View>
      </View>
      <ProfileBox
        likes={user.likes}
        comments={user.comments}
        visited={user.visited}
      />
    </View>
  ) : null
}

const mapStateToProps = getState => ({
  user: getState.authReducer.user
})

export default connect(mapStateToProps)(PersonalHeader)
