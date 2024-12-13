import { View, StyleSheet, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

export default function HomeScreen() {
  const [value, setValue] = useState('TextInput');

  const [tasks, setTasks] = useState([
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'JS', isDone: false },
    { id: 3, title: 'CSS', isDone: true },
    { id: 4, title: 'React', isDone: true },
    { id: 5, title: 'ReactNative', isDone: false },
  ]);

  const taskStatusChangeHandler = (id: number) => {
    setTasks(tasks.map((list) => (list.id === id ? { ...list, isDone: !list.isDone } : list)));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[globalStyles.border, styles.input]}
        value={value}
        onChangeText={setValue}
      />
      <View style={styles.boxContainer}>
        {tasks.map((task) => {
          return (
            <View key={task.id} style={[styles.boxTask, globalStyles.border]}>
              <Checkbox
                value={task.isDone}
                onValueChange={() => taskStatusChangeHandler(task.id)}></Checkbox>
              <Text>{task.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#232946',
  },
  input: {
    width: '60%',
    backgroundColor: '#fffffe',
    borderColor: 'black',
    fontSize: 20,
    padding: 5,
    marginBottom: 15,
  },
  boxTask: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
  },

  boxContainer: {
    width: '60%',
  },
});

const globalStyles = StyleSheet.create({
  border: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
});
