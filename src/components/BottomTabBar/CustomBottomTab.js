import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { CustomIcon } from '../../assets/icons';
import palette from '../../assets/palette';

const iconTab = ['home', 'map', 'list', 'personal'];

const CustomBottomTab = props => {
  const { navigation } = props;
  const { routes } = navigation.state;
  return (
    <View
      style={{
        borderTopWidth: 0.5,
        borderTopColor: palette.backgroundColorGrey,
        height: 50,
        width: Dimensions.get('window').width,
        flexDirection: 'row'
      }}
    >
      {routes &&
        routes.map((route, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => props.jumpTo(route.routeName)}
              style={{}}
            >
              <View
                style={{
                  width: '25%',
                  minHeight: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    navigation.state.index === index
                      ? palette.backgroundTabColor
                      : palette.backgroundColorWhite,
                  borderBottomWidth: navigation.state.index === index ? 3 : 0,
                  borderBottomColor: palette.primaryColorLight
                }}
              >
                {navigation.state.index === index && (
                  <CustomIcon
                    name={iconTab[index]}
                    size={index === 2 || index === 3 ? 16 : 24}
                    color={palette.primaryColorLight}
                  />
                )}
                {navigation.state.index !== index && (
                  <CustomIcon
                    name={iconTab[index]}
                    size={index === 2 || index === 3 ? 16 : 24}
                    color={palette.secondaryTypographyColor}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
    </View>
  );
};

export default CustomBottomTab;
