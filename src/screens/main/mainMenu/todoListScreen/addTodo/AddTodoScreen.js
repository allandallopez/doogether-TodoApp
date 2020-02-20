import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';

import Service from '../../../../../utils/TodoServices';

import {h, customFont} from '../../../../../components/variable/dimension';
import AsyncStorage from '@react-native-community/async-storage';

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
        console.log(61, data);
        if (data !== null) {
          arr = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log('res', arr);
    this.setState({isLoading: true});
    if (arr.length > 0) {
      console.log('masuk if ');
      await Service.post(arr, payload).then(res => {
        console.log('arrrr', res);
        arr.push(res);
      });
      console.log('newwww', arr);
      await this.storeItem('todos', arr)
        .then(res => {
          this.setState({isLoading: false});
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

  submitTodo = async () => {
    try {
      const {todo, todos} = this.state;
      if (todo) {
        let newTodos = todos ? [...todos] : [];
        const data = {
          id: `${Math.floor(Math.random() * 100)}${Math.floor(
            Math.random() * 100,
          )}`,
          todo,
          isDone: false,
        };

        newTodos.push(data);
        await AsyncStorage.setItem('Todo', JSON.stringify(newTodos));
        this.props.navigation.replace('TodoList');
      } else {
        Alert.alert('Silahkan isi form terlebih dahulu.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.title);
    console.log(this.state.description);
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View
          style={{
            height: h / 1.12,
          }}>
          <View
            style={{
              height: '15%',
              backgroundColor: '#dfe6e9',
              paddingHorizontal: '2%',
            }}>
            <View
              style={{
                height: '100%',
                justifyContent: 'space-evenly',
              }}>
              <TextInput
                style={{
                  height: '40%',
                  backgroundColor: '#b2bec3',
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  color: '#fff',
                }}
                placeholder="Title"
                placeholderTextColor="#dfe6e9"
                value={this.state.title}
                onChangeText={this.onChangeTitle}
              />
              <TextInput
                style={{
                  height: '40%',
                  backgroundColor: '#b2bec3',
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  color: '#fff',
                }}
                placeholder="Desctription"
                placeholderTextColor="#dfe6e9"
                value={this.state.description}
                onChangeText={this.onChangeDesctription}
              />
              {this.state.isLoading ? (
                <ActivityIndicator color="#F7F7F7" size={50} />
              ) : (
                <TouchableOpacity onPress={this.addTodo} activeOpacity={0.6}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View></View>
      </SafeAreaView>
    );
  }
}
export default AddTodoScreen;
