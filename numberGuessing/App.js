import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { reset } from 'expo/build/AR';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('Guess a number between 1-100:');
  const [counter, setCounter] = useState(0);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1);
  
  useEffect(()=> console.log(randomNum), console.log('counter', counter))

  const guess= () => {
    if(!isNaN(input) && Number(input) > randomNum) {
      setResult(`Your guess ${input} is too high`);
      setCounter(counter + 1);
    }
    else if (!isNaN(input) && Number(input) < randomNum) {
      setResult(`Your guess ${input} is too low`);
      setCounter(counter + 1);
    }
    else if (isNaN(input)) {
      setResult('Please enter valid number')
    }
    else {
      alert(`You guessed the number in ${counter + 1} guesses!`);
      resetGame();
    }
  }
    const resetGame = () => {
      setRandomNum(Math.floor(Math.random() * 100) + 1);
      setCounter(0);
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
