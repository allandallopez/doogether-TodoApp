import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import TodoListScreen from '../../screens/main/mainMenu/todoListScreen/TodoListScreen';

const TodoTab = createStackNavigator(
    {
        TodoList: {
            screen: TodoListScreen,
        },
    },
    {
        initialRouteName: 'TodoList',
        headerMode: 'none'
    }
);

export default TodoTab;
