import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import moment from 'moment';

import Service from '../../../../utils/TodoServices';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {h, customFont} from '../../../../components/variable/dimension';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {CheckBox} from 'react-native-elements';
import normalize from 'react-native-normalize';

class TodoScreen extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      todo: '',
      todos: [],
      isModalVisible: false,
      selectedData: null,
    };
  }

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

  getAllTodo = () => {
    this.retrieveItem('todos')
      .then(data => {
        console.log('here', data);
        this.setState({todos: data});
        //this callback is executed when your Promise is resolved
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log('Promise is rejected with error: ' + error);
      });
  };

  showModal = id => {
    Service.getById(this.state.todos, id).then(res => {
      console.log('here', res);
      this.setState({selectedData: res[0], isModalVisible: true});
    });
  };

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

  updateTodo = id => {
    const updated = this.state.todos;
    for (let i in updated) {
      if (updated[i].id === id) {
        updated[i].isChecked = !updated[i].isChecked;
      }
    }
    this.storeItem('todos', updated)
      .then(() => {
        this.getAllTodo();
      })
      .catch(() => {
        console.log('err');
      });
  };

  deleteTodo = id => {
    Service.delete(this.state.todos, id).then(res => {
      this.storeItem('todos', res)
        .then(() => {
          this.getAllTodo();
        })
        .catch(() => {
          console.log('err');
        });
    });
  };

  clearState = async () => {
    this.setState({
      todo: '',
    });
    await AsyncStorage.removeItem('Todo');
  };

  getTodo = async () => {
    try {
      const value = await AsyncStorage.getItem('Todo');
      if (value) {
        this.setState({
          todos: JSON.parse(value),
        });
      } else {
        Alert.alert('Belum ada data');
      }
    } catch (err) {
      console.log(err);
    }
  };

  gotoAddTodo = () => {
    this.props.navigation.navigate('AddTodo');
  };

  componentDidMount() {
    this.getAllTodo();
  }

  render() {
    let modal;
    if (this.state.isModalVisible) {
      modal = (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({isModalVisible: false});
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{this.state.selectedData.title}</Text>
            </View>
          </View>
        </Modal>
      );
    }
    const {todo, todos} = this.state;
    console.log(todos);
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <ScrollView
          style={{
            padding: '2%',
          }}>
          {todos &&
            todos.map((todo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.showModal(todo.id)}
                style={{
                  backgroundColor: todo.isChecked ? '#c5f6fa' : '#dfe6e9',
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                <View
                  style={{width: '79%', padding: 10, flexDirection: 'column'}}>
                  <Text
                    style={{
                      color: '#2d3436',
                      textAlign: 'justify',
                    }}>
                    {todo.title}
                  </Text>
                  <Text style={{fontSize: 12, color: '#888888', marginTop: 10}}>
                    {moment(todo.created_time).format('DD-MM-YYYY hh:mm')}
                  </Text>
                </View>

                <CheckBox
                  checked={todo.isChecked}
                  checkedColor="#273c75"
                  onPress={() => this.updateTodo(todo.id)}
                />

                <TouchableOpacity
                  style={{
                    width: '10%',
                    backgroundColor: '#d63031',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Alert.alert(
                      'Delete',
                      `Are you sure want to delete todo ${todo.title}`,
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => this.deleteTodo(todo.id)},
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Icon
                    name="trash-alt"
                    style={{color: '#fff', ...customFont(50)}}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </ScrollView>
        {modal}
        <TouchableOpacity
          style={{
            height: '9%',
            width: 60,
            backgroundColor: '#2980b9',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: normalize(30),
            marginLeft: normalize(290),
          }}
          onPress={this.gotoAddTodo}>
          <Text style={{color: '#fff', fontSize: 30, fontWeight: '600'}}>
            +
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default TodoScreen;
