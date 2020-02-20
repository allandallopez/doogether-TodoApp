import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import FakeApiScreen from '../../screens/main/mainMenu/fakeApiScreen/FakeApiScreen';
import AddFakeApiScreen from '../../screens/main/mainMenu/fakeApiScreen/addFakeApiScreen/AddFakeApiScreen'

const FakeApiTab = createStackNavigator(
    {
        FakeApi: {
            screen: FakeApiScreen
        },
        AddFakeApi: {
            screen: AddFakeApiScreen
        }
    },
    {
        initialRouteName: 'FakeApi',
        headerMode: 'none',
    }
);

export default FakeApiTab;
