import { createStackNavigator } from 'react-navigation'
import CollectionScreen from '../containers/Collection/CollectionScreen'
import SearchScreen from '../containers/Search/SearchScreen'

const CollectionStack = createStackNavigator(
  {
    Collection: {
      screen: CollectionScreen
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none'
  }
)

export default CollectionStack
