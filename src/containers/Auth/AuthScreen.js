/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import styles from "./styles";
import palette from "../../assets/palette";
import { icons } from "../../assets/icons";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const AuthTab = createMaterialTopTabNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        title: "SIGN IN"
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: "SIGN UP"
      })
    }
  },
  {
    initialRouteName: "SignIn",
    animationEnabled: true,
    tabBarOptions: {
      style: {
        justifyContent: "center",
        backgroundColor: palette.backgroundColorWhite
      },
      labelStyle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14
      },
      activeTintColor: palette.primaryColor,
      inactiveTintColor: palette.secondaryTypographyColor,
      indicatorStyle: { backgroundColor: palette.primaryColorLight, height: 3 }
    }
  }
);

const AuthContainer = createAppContainer(AuthTab);

class AuthScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 2, backgroundColor: palette.primaryColor }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 40
            }}
          >
            {icons.logo}
          </View>
        </View>
        <View
          style={{ flex: 5, backgroundColor: palette.backgroundColorWhite }}
        >
          <AuthContainer />
        </View>
      </SafeAreaView>
    );
  }
}

export default AuthScreen;
