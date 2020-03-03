import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('Guess a number between 1-100:');
  const [counter, setCounter] = useState(0);

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const guess= () => {
    if(Number(input) > randomNumber) {
      setResult(`Your guess ${input} is too high`);
      setCounter(counter + 1);
    }
    else if (Number(input) < randomNumber) {
      setResult(`Your guess ${input} is too low`);
      setCounter(counter + 1);
    }
    else {
      alert(`You guessed the number in ${counter} guesses!`)
    }
  }

  const { container, inputStyle, resultStyle } = styles;
  return (
    <View style={container}>
      <Text style={resultStyle}>{result}</Text>

      <TextInput
        style={inputStyle}
        onChangeText={(input) => setInput(input)}
        value={input}
        keyboardType="numeric" />
      <Button onPress={guess} title="MAKE GUESS"/>
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
  inputStyle: {
    width: 70,
    borderColor: 'gray',
    borderWidth: 1
  },
  resultStyle: {
    fontSize: 15,
  }
});
