import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import CollectionScreen from '../containers/Collection/CollectionScreen'
import MapScreen from '../containers/Map/MapScreen'
import CustomBottomTab from '../components/BottomTabBar/CustomBottomTab'
import HomeScreen from '../containers/Home/HomeScreen'
import ProfileContainer from './ProfileContainer'
import CollectionStack from './CollectionStack'

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Map: {
      screen: MapScreen
    },
    CollectionStack: {
      screen: CollectionStack
    },
    Profile: {
      screen: ProfileContainer
    }
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: CustomBottomTab,
    animationEnabled: true
  }
)

export default TabNavigator

export const TabContainer = createAppContainer(TabNavigator)
