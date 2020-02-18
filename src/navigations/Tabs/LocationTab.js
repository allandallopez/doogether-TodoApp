import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LocationScreen from '../../screens/main/mainMenu/locationScreen/LocationScreen';

const LocationTab = createStackNavigator(
    {
        Location: {
            screen: LocationScreen
        },
    },
    {
        initialRouteName: 'Location',
        headerMode: 'none'
    }
);

export default LocationTab;
