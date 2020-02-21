import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import Styles from './FakeApiScreenStyles';
import axios from 'axios';
import normalize from 'react-native-normalize';

class FakeApiScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: '',
      body: '',
      userId: '1',
      isLoading: true,
    };
  }

  getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(({data}) => {
      this.setState({data, isLoading: false});
      AsyncStorage.setItem('apiData', JSON.stringify(data.sort((a, b) => {
        return b.id - a.id;
      })));
    });
  };

  componentDidMount() {
    this.getData();
  }

  gotoAddFakeApi = () => {
    this.props.navigation.navigate('AddFakeApi');
  };

  render() {
    const {data, isLoading} = this.state;
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.titleHeader}>Your News</Text>
        </View>
        <TouchableOpacity
          style={Styles.buttonAdd}
          onPress={this.gotoAddFakeApi}>
          <Text style={Styles.titleButtonAdd}>Add</Text>
        </TouchableOpacity>
        <View>
          {isLoading ? (
            <View style={Styles.loadingContainer}>
              <ActivityIndicator size={45} color="#00cec9" />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => {
                return (
                  <View style={{backgroundColor: '#3498db', marginBottom: 10, borderRadius: 20, flexDirection: 'column'}}>
                    <Text style={{fontSize: 17, fontWeight: '700', marginLeft: normalize(13)}}>
                      {item.title}
                    </Text>
                    <Text style={{fontSize: 13, marginLeft: normalize(13)}}>{item.body}</Text>
                  </View>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default FakeApiScreen;
