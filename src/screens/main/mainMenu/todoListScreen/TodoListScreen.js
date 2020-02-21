import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import moment from 'moment';

import Service from '../../../../utils/TodoServices';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from './TodolistScreenStyles';
import {customFont} from '../../../../components/variable/dimension';
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
        this.setState({todos: data});
      })
      .catch(error => {
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
          style={{height: 50, width: 50}}
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({isModalVisible: false});
          }}>
          <View style={Styles.container}>
            <View
              style={{marginBottom: normalize(20), marginTop: normalize(7)}}>
              <Text style={{fontSize: 30, fontWeight: '700'}}>Detail List</Text>
            </View>
            <View style={Styles.modalContainer}>
              <Text style={Styles.modalTitle}>
                {this.state.selectedData.title}
              </Text>
              <Text style={Styles.modalDescription}>
                {this.state.selectedData.description}
              </Text>
            </View>
          </View>
        </Modal>
      );
    }
    const {todos} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={Styles.headerContainer}>
          <Text style={Styles.titleHeader}>Hii John :)</Text>
          <Text style={Styles.titleHeader}>Have a nice day !!! </Text>
        </View>
        <ScrollView>
          {todos &&
            todos.map((todo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.showModal(todo.id)}
                style={{
                  backgroundColor: todo.isChecked ? '#c5f6fa' : '#dfe6e9',
                  marginBottom: normalize(10),
                  flexDirection: 'row',
                  borderRadius: normalize(12),
                }}>
                <CheckBox
                  checked={todo.isChecked}
                  checkedColor="#273c75"
                  onPress={() => this.updateTodo(todo.id)}
                />
                <View
                  style={{width: '60%', padding: 10, flexDirection: 'column'}}>
                  <Text
                    style={{color: '#2d3436'}}>
                    {todo.title}
                  </Text>
                  <Text style={{fontSize: 12, color: '#888888', marginTop: 10}}>
                    {moment(todo.created_time).format('DD-MM-YYYY hh:mm')}
                  </Text>
                </View>
                <TouchableOpacity style={Styles.deleteBtn} onPress={() => {
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
        <TouchableOpacity style={Styles.addBtn} onPress={(this.gotoAddTodo)}>
          <Text style={{color: '#fff', fontSize: 30, fontWeight: '600'}}>
            +
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default TodoScreen;
