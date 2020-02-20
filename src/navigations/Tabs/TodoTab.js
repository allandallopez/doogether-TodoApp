import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import TodoListScreen from '../../screens/main/mainMenu/todoListScreen/TodoListScreen';
import AddTodoListScreen from '../../screens/main/mainMenu/todoListScreen/addTodo/AddTodoScreen';

const TodoTab = createStackNavigator(
    {
        TodoList: {
            screen: TodoListScreen,
        },
        AddTodo : {
            screen: AddTodoListScreen
        }
    },
    {
        initialRouteName: 'TodoList',
        headerMode: 'none',
    }
);

export default TodoTab;
