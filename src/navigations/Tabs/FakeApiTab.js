import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import FakeApiScreen from '../../screens/main/mainMenu/fakeApiScreen/FakeApiScreen';

const FakeApiTab = createStackNavigator(
    {
        FakeApi: {
            screen: FakeApiScreen
        },
    },
    {
        initialRouteName: 'FakeApi',
        headerMode: 'none',
    }
);

export default FakeApiTab;
