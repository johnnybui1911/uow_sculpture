import React from 'react'
import {
  Animated,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View
} from 'react-native'
import { SCREEN_WIDTH } from '../../assets/dimension'
import palette from '../../assets/palette'

const TEXT_INPUT_HEIGHT = 40

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
    const editCheck =
      (selectedComment && selectedComment.text !== inputValue.trim()) ||
      !selectedComment

    const translateY = inputHeight.interpolate({
      inputRange: [
        TEXT_INPUT_HEIGHT,
        TEXT_INPUT_HEIGHT * 2,
        TEXT_INPUT_HEIGHT * 3
      ],
      outputRange: [0, -TEXT_INPUT_HEIGHT, -TEXT_INPUT_HEIGHT * 2],
      extrapolate: 'clamp'
    })
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: keyboardHeight,
          width: SCREEN_WIDTH,
          minHeight: 60,
          transform: [{ translateY: translateY }],
          zIndex: 2,
          elevation: 2
        }}
      >
        <Animated.View
          style={{
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
              marginLeft: 12, // 7
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
                if (height <= TEXT_INPUT_HEIGHT * 3)
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
          </Animated.View>
        </Animated.View>
      </Animated.View>
    )
  }
)

export default InputKeyboard
