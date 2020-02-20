import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

export const TodoCard = ({title, isChecked, check, remove}) => {
  return (
    <View style={styles.container}>
      <CheckBox checked={isChecked} onPress={check} />
      <Text
        style={[
          styles.titleText,
          completed && {textDecorationLine: 'line-through'},
        ]}>
        {title}
      </Text>
      <TouchableOpacity onPress={remove}>
        <Icon name="delete" color="#0f1069" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f1c40f',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    color: '#0f1096',
    fontWeight: '400',
    margin: 10,
    textTransform: 'capitalize',
    flex: 1,
  },
});
