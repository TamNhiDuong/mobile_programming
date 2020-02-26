import 'react-native-gesture-handler';
import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import History from './History';
import Home from './Home';

const MyApp = createStackNavigator({
  Home: {screen: Home},
  History: {screen: History},
})
const AppContainer = createAppContainer(MyApp);

export default function App() {
  return (
    <AppContainer />
  );
}

//Install also to avoid error:
//“@react-native-community/masked-view”
//“react-native-safe-area-context”


