import React, {Component} from 'react';
import {Image, Text, StatusBar} from 'react-native';
import Styles from './SplashScreenStyles';
import LinearGradient from 'react-native-linear-gradient';

class SplashScreen extends Component {

  componentDidMount() {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <LinearGradient
        colors={['#00d2d3', '#01a3a4']}
        style={Styles.linearGradient}>
        <StatusBar backgroundColor="#00d2d3" barStyle="light-content" />
        <Image
          source={require('../../assets/Icons/key.png')}
          style={Styles.logoSplash}
        />
        <Text style={Styles.textTitle}>FrenJon's</Text>
      </LinearGradient>
    );
  }
}

export default SplashScreen;
