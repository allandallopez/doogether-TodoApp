import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import Service from '../../../../../utils/TodoServices';
import Styles from './AddTodoScreenStyles';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

class AddTodoScreen extends Component {
  constructor() {
    super();
    this.state = {
      todo: '',
      title: '',
      description: '',
      todos: [],
      isLoading: false,
    };
  }

  storeItem = async (key, item) => {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  };

  retrieveItem = async key => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return;
  };

  addTodo = async () => {
    if (this.state.title.length < 1 || this.state.description.length < 1) {
      alert('Field tidak boleh kosong !');
      return;
    }
    let arr = [];
    let payload = {
      title: this.state.title,
      description: this.state.description,
    };
    let todos = this.state.todos;
    await this.retrieveItem('todos')
      .then(data => {
        if (data !== null) {
          arr = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({isLoading: true});
    if (arr.length > 0) {
      await Service.post(arr, payload).then(res => {
        arr.push(res);
      });
      await this.storeItem('todos', arr)
        .then(res => {
          this.setState({isLoading: false});
          alert('Success add to your plan list :)');
          this.props.navigation.replace('TodoList');
        })
        .catch(() => {
          console.log('err');
        });
    } else {
      Service.post(arr, payload).then(res => {
        arr.push(res);
        this.storeItem('todos', arr)
          .then(res => {
            this.setState({isLoading: false});
          alert('Success add to your plan list :)');
            this.props.navigation.replace('TodoList');
          })
          .catch(() => {
            console.log('err');
          });
      });
    }
  };

  getAllTodo = () => {
    Service.get().then(res => {
      this.setState({todos: res});
    });
  };

  onChangeTitle = events => {
    this.setState({title: events});
  };

  onChangeDesctription = events => {
    this.setState({description: events});
  };

  render() {
    return (
      <LinearGradient
        colors={['#48dbfb', '#01a3a4']}
        style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.titleHeader}>Add Your satisfying</Text>
        </View>
        <View style={{marginTop: 10}}>
          <TextInput
            style={Styles.formTitle}
            placeholder={'Add Title'}
            value={this.state.title}
            onChangeText={this.onChangeTitle}
          />
          <TextInput
            style={Styles.formBody}
            placeholder={'Add Desctrption'}
            value={this.state.description}
            onChangeText={this.onChangeDesctription}
          />
        </View>
        <View style={Styles.buttonAdd}>
          {this.state.isLoading ? (
            <ActivityIndicator color="#F7F7F7" size={50} />
          ) : (
            <TouchableOpacity onPress={this.addTodo} activeOpacity={0.6}>
              <Text style={Styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      {/* // </SafeAreaView> */}
      </LinearGradient>
    );
  }
}
export default AddTodoScreen;
