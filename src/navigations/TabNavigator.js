import React from 'react';
import {View} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome5'
import TodoTab from './Tabs/TodoTab';
import FakeApiTab from './Tabs/FakeApiTab';
import LocationTab from './Tabs/LocationTab';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    TodoLsit: {
      screen: TodoTab,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name="ios-list-box" />
          </View>
        ),
      },
    },
    FakeAPi: {
      screen: FakeApiTab,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <IconMat style={[{color: tintColor}]} size={25} name="playlist-plus" />
          </View>
        ),
      },
    },
    Location: {
      screen: LocationTab,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <IconFa style={[{color: tintColor}]} size={25} name="search-location" />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'TodoLsit',
    inactiveColor: '#a9a9a9',
    activeColor: '#00bfff',
    barStyle: {backgroundColor: '#FFF'},
  },
  
);

export default TabNavigator;
