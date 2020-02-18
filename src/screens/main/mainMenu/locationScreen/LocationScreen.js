import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Styles from './LocationScreenStyles';

class LocationScreen extends Component {
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View>
          <Text>LocationScreen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default LocationScreen;
