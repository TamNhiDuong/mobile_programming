import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDDt1c3G2mP_NNWOQoaGhekpwy_E5KrnR8",
    authDomain: "shoppinglist-3b0dc.firebaseapp.com",
    databaseURL: "https://shoppinglist-3b0dc.firebaseio.com",
    projectId: "shoppinglist-3b0dc",
    storageBucket: "shoppinglist-3b0dc.appspot.com",
    messagingSenderId: "40226160183",
    appId: "1:40226160183:web:ffd6cc1b4a82d2303889b2",
    measurementId: "G-TX0386SJ6K"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val() ? snapshot.val() : {};
      const prods = Object.values(data);
      setItems(prods);
    });
  }, []);

  // Save 
  const saveItem = () => {
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
      );
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  const { container, buttons, input, flatlist } = styles;
  return (
    <View style={container}>
      <TextInput
        placeholder='Product'
        style={input}
        onChangeText={(product) => setProduct(product)}
        value={product}
        keyboardType="default" />

      <TextInput
        placeholder='Amount'
        style={input}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
        keyboardType="default" />

      <View style={buttons}>
        <Button title='SAVE TO DB' onPress={saveItem} />
      </View>

      <View class={flatlist}>
        <Text>Shopping list:</Text>
        <FlatList
          renderItem={({ item }) =>
            <View>
              <Text>{item.product}, {item.amount}</Text>
            </View>
          }
          data={items}
          ItemSeparatorComponent={listSeparator}
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

