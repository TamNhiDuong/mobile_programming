import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists item (id integer primary key not null, product text, amount text);');
    });
    updateList();
  }, []);

  // Save 
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into item (product, amount) values (?, ?);', [product, amount]);
    }, null, updateList
    )
  }

  // Update 
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from item;', [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  }

  // Delete 
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from item where id = ?;`, [id]);
      }, null, updateList
    )
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
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View>
              <Text>{item.product}, {item.amount}</Text>
              <Text onPress={() => deleteItem(item.id)}>Bought</Text>
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

