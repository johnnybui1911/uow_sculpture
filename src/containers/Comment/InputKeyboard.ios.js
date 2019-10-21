/**
 * Description: Keyboard Fixed TextField (IOS platform)
 * Author: Nam Bui
 **/

import React from 'react'
import {
  Animated,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  KeyboardAvoidingView
} from 'react-native'
import { SCREEN_WIDTH } from '../../assets/dimension'
import palette from '../../assets/palette'
import { shadowIOS } from '../../assets/rootStyles'

const TEXT_INPUT_HEIGHT = 40

const InputKeyboard = React.forwardRef(
  (
    {
      picture,
      inputValue,
      _onSubmit,
      handleChangeText,
      isEdit,
      editing,
      children,
      selectedComment
    },
    ref
  ) => {
    const editCheck =
      (selectedComment && selectedComment.text !== inputValue.trim()) ||
      !selectedComment
    return (
      <KeyboardAvoidingView
        // keyboardVerticalOffset={20}
        style={{
          position: 'absolute',
          bottom: 0,
          width: SCREEN_WIDTH
        }}
        behavior="padding"
      >
        {children}
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              backgroundColor: palette.backgroundColorWhite,
              elevation: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              ...shadowIOS
            }
          ]}
        >
          <Image
            source={{ uri: picture }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              alignSelf: 'flex-end',
              marginBottom: 10,
              backgroundColor: '#F6F6F6'
            }}
          />

          <View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                marginLeft: 7,
                backgroundColor: '#F2F3F5',
                borderRadius: 16,
                borderColor: 'rgba(0,0,0,0)',
                maxHeight: TEXT_INPUT_HEIGHT * 3
              }
            ]}
          >
            <TextInput
              ref={ref}
              // autoFocus
              multiline
              numberOfLines={4}
              value={inputValue}
              onChangeText={handleChangeText}
              placeholder="Add a comment..."
              underlineColorAndroid="rgba(0,0,0,0)"
              style={{
                flex: 1,
                padding: 10,
                width: '100%',
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
                color: palette.primaryColor
              }}
              placeholderTextColor="rgb(110, 117, 125)"
              blurOnSubmit={false}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                if (editCheck) {
                  _onSubmit()
                }
              }}
            >
              {editing ? (
                <View
                  style={{
                    alignSelf: 'flex-end',
                    padding: 10
                  }}
                >
                  <ActivityIndicator
                    color={palette.primaryColorLight}
                    size="small"
                  />
                </View>
              ) : (
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    padding: 10,
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 14,
                    color: palette.primaryColorLight,
                    opacity: inputValue.trim() === '' || !editCheck ? 0 : 1
                  }}
                >
                  {isEdit ? 'Edit' : 'Post'}
                </Text>
              )}
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    )
  }
)

export default InputKeyboard

{
  /* <KeyboardAvoidingView
        style={{
        flex: 1,
        position: 'absolute',
        bottom: 0
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    > */
}
