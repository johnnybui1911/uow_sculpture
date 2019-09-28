import React from 'react'
import Modal from 'react-native-modal'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './styles'
import palette from '../../assets/palette'

const DeleteModal = ({ isModalOpen, _closeModal, _deleteComment }) => {
  return (
    <Modal
      // animationIn="fadeIn"
      // animationInTiming={300}
      // animationOut="fadeOut"
      // animationOutTiming={300}
      isVisible={isModalOpen}
      onBackdropPress={_closeModal}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 4,
          justifyContent: 'space-between',
          padding: 24,
          paddingBottom: 24 - 4
        }}
      >
        <View>
          <Text style={[styles.title]}>Delete comment</Text>
          <Text
            style={[
              styles.title,
              {
                fontSize: 12,
                paddingTop: 4,
                fontFamily: 'Montserrat-Medium'
              }
            ]}
          >
            Delete your comment permanently?
          </Text>
        </View>
        <View
          style={{
            paddingTop: 24,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <TouchableHighlight
            underlayColor="#FAFAFA"
            style={{ marginRight: 12, padding: 4, borderRadius: 4 }}
            onPress={_closeModal}
          >
            <View style={{}}>
              <Text style={styles.menuText}>CANCEL</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#FAFAFA" onPress={_deleteComment}>
            <View style={{ padding: 4, borderRadius: 4 }}>
              <Text style={styles.menuText}>DELETE</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteModal
