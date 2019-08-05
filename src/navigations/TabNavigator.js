import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import CollectionScreen from "../containers/Collection/CollectionScreen";
import MapScreen from "../containers/Map/MapScreen";
import AuthScreen from "../containers/Auth/AuthScreen";
import CustomBottomTab from "../components/BottomTabBar/CustomBottomTab";
import HomeStack from "../navigations/HomeStack";
import PersonalScreen from "../containers/Personal/PersonalScreen";
import HomeScreen from "../containers/Home/HomeScreen";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Map: {
      screen: MapScreen
    },
    Collection: {
      screen: CollectionScreen
    },
    Profile: {
      screen: PersonalScreen
    }
  },
  {
    initialRouteName: "Collection",
    tabBarPosition: "bottom",
    tabBarComponent: CustomBottomTab,
    animationEnabled: true
  }
);

export default TabNavigator;

export const TabContainer = createAppContainer(TabNavigator);
