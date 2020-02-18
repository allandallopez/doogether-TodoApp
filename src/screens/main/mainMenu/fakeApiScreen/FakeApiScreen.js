import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Styles from './FakeApiScreenStyles';

class FakeApiScreen extends Component {
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View>
          <Text>FakeApiScreen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default FakeApiScreen;
