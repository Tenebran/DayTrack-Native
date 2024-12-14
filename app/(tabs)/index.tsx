import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { v1 } from 'uuid';
import { title } from 'process';

export default function HomeScreen() {
  const [value, setValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [openChanger, setOpenChanger] = useState<{ id: string }>({
    id: '',
  });

  const [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'JS', isDone: false },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'ReactNative', isDone: false },
  ]);

  const taskStatusChangeHandler = (id: string) => {
    setTasks(tasks.map((list) => (list.id === id ? { ...list, isDone: !list.isDone } : list)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTaskHandler = () => {
    setTasks([{ id: v1(), title: value, isDone: false }, ...tasks]);
  };

  const changeTaskTitle = (id: string) => {
    setTasks(tasks.map((list) => (list.id === id ? { ...list, title: newValue } : list)));
    setOpenChanger({ id: '' });
    setNewValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[globalStyles.border, styles.input]}
        value={value}
        onChangeText={setValue}
      />
      <Button onPress={addTaskHandler} title="Add" />
      <View style={styles.boxContainer}>
        {tasks.map((task) => {
          return (
            <View key={task.id} style={[styles.boxTask, globalStyles.border]}>
              {openChanger.id === task.id ? (
                <>
                  <TextInput
                    style={[globalStyles.border, styles.input]}
                    value={newValue}
                    onChangeText={setNewValue}
                  />
                  <Button onPress={() => changeTaskTitle(task.id)} title="save" />
                </>
              ) : (
                <>
                  <Checkbox
                    value={task.isDone}
                    onValueChange={() => taskStatusChangeHandler(task.id)}></Checkbox>
                  <Text onPress={() => setOpenChanger({ id: task.id })}>{task.title}</Text>
                  <Button onPress={() => deleteTask(task.id)} title="delete" />
                </>
              )}
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
