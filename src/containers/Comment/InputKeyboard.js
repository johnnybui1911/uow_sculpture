import React from 'react'
import {
  Animated,
  Platform,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View
} from 'react-native'
import { SCREEN_WIDTH } from '../../assets/dimension'
import palette from '../../assets/palette'

const TEXT_INPUT_HEIGHT = Platform.OS === 'ios' ? 45 : 40

const InputKeyboard = React.forwardRef(
  (
    {
      picture,
      keyboardHeight,
      inputHeight,
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
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: SCREEN_WIDTH
        }}
      >
        {children}
        <Animated.View
          style={{
            // position: 'absolute',
            // bottom: 0,
            width: SCREEN_WIDTH,
            backgroundColor: palette.backgroundColorWhite,
            elevation: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24
            // paddingBottom: keyboardHeight
          }}
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

          <Animated.View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              marginLeft: 7,
              height: inputHeight,
              backgroundColor: '#F2F3F5',
              borderRadius: 16,
              borderColor: 'rgba(0,0,0,0)'
            }}
          >
            <TextInput
              ref={ref}
              // autoFocus
              onContentSizeChange={e => {
                const { height } = e.nativeEvent.contentSize
                if (height < TEXT_INPUT_HEIGHT * 3)
                  Animated.timing(inputHeight, {
                    toValue: height,
                    duration: 100
                  }).start()
              }}
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
            {((selectedComment && selectedComment.text !== inputValue.trim()) ||
              !selectedComment) && (
              <TouchableWithoutFeedback onPress={_onSubmit}>
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
                      opacity: inputValue.trim() === '' ? 0 : 1
                    }}
                  >
                    {isEdit ? 'Edit' : 'Post'}
                  </Text>
                )}
              </TouchableWithoutFeedback>
            )}
          </Animated.View>
        </Animated.View>
      </View>
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
