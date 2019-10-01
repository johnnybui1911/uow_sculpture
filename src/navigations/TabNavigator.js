import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import CollectionScreen from '../containers/Collection/CollectionScreen'
import MapScreen from '../containers/Map/MapScreen'
import CustomBottomTab from '../components/BottomTabBar/CustomBottomTab'
import HomeScreen from '../containers/Home/HomeScreen'
import ProfileContainer from './ProfileContainer'

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
      screen: ProfileContainer
    }
  },
  {
    initialRouteName: 'Profile',
    tabBarPosition: 'bottom',
    tabBarComponent: CustomBottomTab,
    animationEnabled: true
  }
)

export default TabNavigator

export const TabContainer = createAppContainer(TabNavigator)
