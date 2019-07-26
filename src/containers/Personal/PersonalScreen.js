/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import styles from "./styles";
import palette from "../../assets/palette";
import LikeScreen from "./LikeScreen";
import images from "../../assets/images";
import AboutScreen from "./AboutScreen";
import ProfileBox from "./ProfileBox";
import CommentScreen from "./CommentScreen";

const PersonalTab = createMaterialTopTabNavigator(
  {
    Like: {
      screen: LikeScreen,
      navigationOptions: () => ({
        title: "LIKES"
      })
    },
    Comment: {
      screen: CommentScreen,
      navigationOptions: () => ({
        title: "COMMENTS"
      })
    },
    About: {
      screen: AboutScreen,
      navigationOptions: () => ({
        title: "ABOUT"
      })
    }
  },
  {
    initialRouteName: "Like",
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

const PersonalContainer = createAppContainer(PersonalTab);

class PersonalScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "Cristiano Ronaldo",
        email: "cristiano@gmail.com",
        joinDate: new Date("October 13, 2014"),
        likes: 3,
        comments: 4,
        visited: 3
      }
    };
  }

  render() {
    const { user } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, backgroundColor: palette.primaryColor }}>
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
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 15
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor: palette.primaryColor,
                overflow: "hidden"
              }}
            >
              <Image source={images.profile} style={{}} resizeMode="center" />
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
        <View
          style={{ flex: 1, backgroundColor: palette.backgroundColorWhite }}
        >
          <PersonalContainer />
        </View>
      </SafeAreaView>
    );
  }
}

export default PersonalScreen;
