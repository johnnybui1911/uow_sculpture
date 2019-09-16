import { createStackNavigator, createAppContainer } from 'react-navigation'
import DetailScreen from '../containers/Detail/DetailScreen'
import TabNavigator from './TabNavigator'
import CommentScreen from '../containers/Comment/CommentScreen'
import SearchScreen from '../containers/Search/SearchScreen'

const AppStack = createStackNavigator(
  {
    MainTab: {
      screen: TabNavigator
    },
    Detail: {
      screen: DetailScreen
    },
    Comment: {
      screen: CommentScreen
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    initialRouteName: 'MainTab',
    headerMode: 'none'
  }
)

export default AppStack

export const AppContainer = createAppContainer(AppStack)
