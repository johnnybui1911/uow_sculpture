import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import moment from 'moment'
import { icons } from '../../assets/icons'
import styles from './styles'
import palette from '../../assets/palette'

const CommentItem = ({
  item,
  _openModal,
  _selectComment,
  _handleEditComment,
  userId
}) => {
  let menuRef = null

  const setMenuRef = ref => (menuRef = ref)
  const hideMenu = () => menuRef.hide()
  const showMenu = () => menuRef.show()

  const editComment = () => {
    _handleEditComment()
    Platform.OS === 'android' && hideMenu()
  }

  const deleteComment = () => {
    hideMenu()
    _openModal()
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <View style={[]}>
        <Image
          source={{ uri: item.userImg }}
          style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
        />
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
            alignItems: 'flex-end',
            paddingTop: 1
          }}
        >
          <Text style={[styles.title, { fontSize: 14, marginRight: 5 }]}>
            {item.userName}
          </Text>
          <Text
            style={[
              styles.description,
              {
                fontSize: 13,
                paddingBottom: 0.5,
                color: 'rgb(136,136,136)'
              }
            ]}
          >
            {item.submitDate
              ? moment(item.submitDate)
                  .fromNow()
                  .includes('few seconds')
                ? 'Just now'
                : moment(item.submitDate).fromNow()
              : 'Posting...'}
          </Text>
        </View>
        <Text
          style={[
            styles.description_cmt,
            { marginBottom: 3, fontSize: 14, opacity: 0.9 }
          ]}
        >
          {item.text}
        </Text>
      </View>
      {userId && userId === item.userId && item.submitDate && (
        <View
          style={
            {
              // alignItems: 'flex-end'
              // marginRight: -12 // manual fix icons not align
              // justifyContent: 'flex-start'
            }
          }
        >
          {Platform.OS === 'ios' ? (
            <TouchableWithoutFeedback
              onPress={() => {
                _selectComment(item)
              }}
            >
              <View style={styles.socialIconStyle}>
                {icons.vertical_dots_light}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <Menu
              ref={setMenuRef}
              button={
                <TouchableWithoutFeedback
                  onPress={() => {
                    _selectComment(item)
                    showMenu()
                  }}
                >
                  <View style={styles.socialIconStyle}>
                    {icons.vertical_dots_light}
                  </View>
                </TouchableWithoutFeedback>
              }
            >
              <MenuItem textStyle={styles.menuText} onPress={editComment}>
                Edit
              </MenuItem>
              <MenuItem textStyle={styles.menuText} onPress={deleteComment}>
                Delete
              </MenuItem>
            </Menu>
          )}
        </View>
      )}
    </View>
  )
}

const mapStateToProps = getState => ({
  userId: getState.authReducer.user.userId
})

export default connect(mapStateToProps)(CommentItem)
