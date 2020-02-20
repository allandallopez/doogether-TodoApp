import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Styles from './AddFakeApiScreenStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class AddFakeApiScreen extends Component {
  state = {
    data: [],
    title: '',
    body: '',
    userId: 26,
    isLoading: true,
  };

  addPostData = () => {
    const {title, body, userId} = this.state;
    if (this.state.title.length < 1 || this.state.body.length < 1) {
      alert('Field tidak boleh kosong !');
      return;
    } else {
      axios
        .post('https://jsonplaceholder.typicode.com/posts', {
          userId,
          title,
          body,
        })
        .then(({data}) => {
          AsyncStorage.setItem('apiData', JSON.stringify(data));
          console.log('success', data);
          alert('Succes add data');
          this.props.navigation.replace('FakeApi');
        });
    }
  };

  onChangeTitle = events => {
    this.setState({title: events});
  };

  onChangeBody = events => {
    this.setState({body: events});
  };

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.titleHeader}>Add Your satisfying</Text>
        </View>
        <View style={{marginTop: 10}}>
          <TextInput
            style={Styles.formTitle}
            placeholder={'Add Title'}
            value={this.state.title}
            onChangeText={value => this.setState({title: value})}
          />
          <TextInput
            style={Styles.formBody}
            placeholder={'Add Body'}
            value={this.state.body}
            onChangeText={value => this.setState({body: value})}
          />
        </View>
        <View style={Styles.buttonAdd}>
          <TouchableOpacity onPress={this.addPostData}>
            <Text style={Styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default AddFakeApiScreen;
