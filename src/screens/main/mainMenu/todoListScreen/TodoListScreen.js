import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Styles from './TodolistScreenStyles';

class TodoScreen extends Component {
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View>
          <Text>halloooo todooooooo</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default TodoScreen;
