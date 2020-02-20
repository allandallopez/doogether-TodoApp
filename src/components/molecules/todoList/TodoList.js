import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import TodoCard from '../../atoms/card/todoCard/TodoCard';

export const TodoList = ({todos, title, isChecked, check, remove}) => {
    return (
        <View style={styles.container}>
            <FlatList
             data={todos}
             keyExtractor={item => id}
             renderItem={({item}) => {
                 return (
                     <TodoCard
                     title={title}
                     isChecked={isChecked}
                     check={check}
                     remove={remove}/>
                 )
             }}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    textInputContainer: {
      height: 60,
      width: '100%',
      borderRadius: 5,
      flexDirection: 'row',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#1f7898',
      position: 'absolute',
      left: 10,
      bottom: 10,
      backgroundColor: '#fff',
    },
    button: {
      height: 60,
      width: 60,
      backgroundColor: '#1f7898',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });