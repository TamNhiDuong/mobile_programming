import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Alert } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('Guess a number between 1-100:');
  const [counter, setCounter] = useState(0);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1);
  const [highScore, setHighScore] = useState();
  
  useEffect(()=> async() => (displayHighScore()));

  const guess= () => {
    console.log('random num', randomNum);
   
    if(!isNaN(input) && Number(input) > randomNum) {
      setCounter(counter + 1);
      setResult(`Your guess ${input} is too high`);
    }
    else if (!isNaN(input) && Number(input) < randomNum) {
      setCounter(counter + 1);
      setResult(`Your guess ${input} is too low`);
    }
    else if (isNaN(input)) {
      setResult('Please enter valid number')
    }
    else {
      alert(`You guessed the number in ${counter + 1} guesses!`);
      saveData();
      setRandomNum(Math.floor(Math.random() * 100) + 1);
    }
  }
  //save current counter to AsyncStorage when user's guess is correct
  const saveData = async() => {
    try{
      //only save new counter if it < savedData or to initiate data 
      if((counter + 1) < highScore || highScore === null) {
        await AsyncStorage.setItem('counter', JSON.stringify(counter + 1));
      }
    }
    catch {
      Alert.alert('Error saving data');
    }  
    setCounter(0); 
  }

 //Display highScore saved in AsyncStorage
  const displayHighScore = async() => {
    try{
      const savedCounter = await AsyncStorage.getItem('counter');
      let parsedSavedCounter = JSON.parse(savedCounter);
      setHighScore(parsedSavedCounter);
      console.log('parsedSavedCounter', parsedSavedCounter)
    }
    catch (error) {
      Alert.alert('Error reading data from storage');
    }
  }

  //Clear old storage, just for testing
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
    setHighScore();
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
      <Button onPress={clearAsyncStorage} title="CLEAR STORAGE"/>
      <View>
        <Text>High Score: {highScore} guesses</Text>
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
  inputStyle: {
    width: 70,
    borderColor: 'gray',
    borderWidth: 1
  },
  resultStyle: {
    fontSize: 15,
  }
});
