import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const { container, buttons, input } = styles;

  const onPlus = () => {
    const value = Number(text) + Number(text2);
    setResult(value);
  }

  const onSubstract = () => {
    const value = Number(text) - Number(text2);
    setResult(value);
  }

  return (
    <View style={container}>
      <Text>Calculator App</Text>
      <Text>Result: {result}</Text>
      <TextInput
        style={input}
        onChangeText={(text) => setText(text)}
        value={text} 
        keyboardType="numeric" />
      <TextInput
        style={input}
        onChangeText={(text2) => setText2(text2)}
        value={text2} 
        keyboardType="numeric" />
      <View style={buttons}>
        <Button title='+' onPress={onPlus}/>
        <Button title='-' onPress={onSubstract}/>
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
  },
  buttons: {
    flexDirection: 'row'
  },
  input: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  }
});
