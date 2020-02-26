import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const onAdd = () => {;
    setData([...data, { key: text }]);
    setText('')
  }

  const onClear = () => {
    setData([]);
    setText('')
  }

  const { container, buttons, input, flatlist } = styles;
  return (
    <View style={container}> 
      <TextInput
        style={input}
        onChangeText={(text) => setText(text)}
        value={text}
        keyboardType="default" />

      <View style={buttons}>
        <Button title='ADD' onPress={onAdd} />
        <Button title='CLEAR' onPress={onClear} />
      </View>

      <View class={flatlist}>
        <Text>Shopping list:</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 300
  },
  buttons: {
    flexDirection: 'row'
  },
  input: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
