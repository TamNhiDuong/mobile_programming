import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Picker, TextInput, Button } from 'react-native';

export default function App() {
  const [data, setData] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedRate, setSelectedRate] = useState();
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const fetchRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=0256100f4184196d3c9103782ec9b6fd&format=1';
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.rates);
        setLoading(false)
        //Create array of object
        let newArray = Object.keys(data).map(key => (
          { name: key, rate: data[key] }
        ))
        setCurrencies(newArray);
        console.log('currencies', currencies);
      })
      .catch((error) => {
        Alert.alert('Error: ', error);
      })
  }

  useEffect(() => {
    fetchRates();
  }, [loading]);

  const pickerChange = (index) => {
    currencies.map((value, i) => {
      if (index === i) {
        setSelectedCurrency(currencies[index].name);
        setSelectedRate(currencies[index].rate)
      }
    })
  }

  const calculate = () => {
    const calResult = (Number(amount) / selectedRate).toFixed(2);
    setResult(calResult);
  }

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> :
        <Picker
          style={{ marginTop: "25%" }}
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) => pickerChange(itemIndex)}>
          {currencies.map((item) => {
            return <Picker.Item key={item.name} label={item.name} value={item.name} />
          })}
        </Picker>}
      <View style={styles.center}>
        <TextInput
          style={styles.input}
          value={amount}
          placeholder="amount"
          onChangeText={(amount) => setAmount(amount)}
        />
        <Button
          title="CONVERT"
          onPress={calculate}
        />
        <Text>RESULT: {result} €</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 18,
    width: 100,
    backgroundColor: 'lightgray',
    borderColor: 'gray',
    borderWidth: 1,
  },
  center: {
    alignItems: "center",
  }
});
