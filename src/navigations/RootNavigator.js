import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import TabNavigator from './TabNavigator';

const RootNavigator = createSwitchNavigator(
  {
    App: {
      screen: TabNavigator,
    },
  },
  {
    initialRouteName: 'App',
    headerMode: 'none',
  },
);

export default createAppContainer(RootNavigator);
