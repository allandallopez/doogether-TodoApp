import React, {Component} from 'react';
import {Text, View, PermissionsAndroid, Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styles from './LocationScreenStyles';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

class Location extends Component {
  state = {
    isLoading: false,
    latitude: '',
    longitude: '',
    address: '',
  };

  async componentDidMount() {
    const grantPermissions = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location ',
      },
    );

    if (grantPermissions) {
      await Geolocation.getCurrentPosition(
        async position => {
          await this.setState({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
          await axios
            .get(
              `http://us1.locationiq.com/v1/reverse.php?key=68e73a2b14084c&lat=${this.state.latitude}&lon=${this.state.longitude}&format=json`,
            )
            .then(res => {
              this.setState({
                address: `${res.data.display_name}`,
              });
              console.log(this.state.address);
            });
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
      this.watchID = Geolocation.watchPosition(position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
      });
    }
  }

  render() {
    return (
      <LinearGradient colors={['#00d2d3', '#01a3a4']} style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
          style={{width: 200, height: 200, marginTop: 15}}
           source={require('../../../../assets/Icons/gos.png')}/>
        </View>
        <View
          style={styles.regionContainer}>
          <Text style={styles.regionTitle}>=> Region</Text>
          <Text style={styles.laTitle}>Latitude: {this.state.latitude}</Text>
          <Text style={styles.laTitle}>Longitude: {this.state.longitude}</Text>
        </View>
        <View
          style={styles.regionContainer}>
          <Text style={styles.regionTitle}>=> Your Current Address</Text>
          <Text style={styles.laTitle}>Address : {this.state.address}</Text>
        </View>
      </LinearGradient>
    );
  }
}

export default Location;
