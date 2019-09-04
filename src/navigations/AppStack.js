import { createStackNavigator, createAppContainer } from 'react-navigation'
import DetailScreen from '../containers/Detail/DetailScreen'
import TabNavigator from './TabNavigator'
import CommentScreen from '../containers/Comment/CommentScreen'

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
    }
  },
  {
    initialRouteName: 'MainTab',
    headerMode: 'none'
  }
)

export default AppStack

export const AppContainer = createAppContainer(AppStack)
