import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipe = () => {
    const toLowerCaseTerm = searchTerm.toLowerCase();
    const url = 'http://www.recipepuppy.com/api/?i=' + toLowerCaseTerm;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setRecipes(responseJson.results);
      })
      .catch((error) => {
        Alert.alert('Error: ', error);
      })
  }
  //Styles
  const { container, input } = styles;
  return (
    <View style={container}>
      <FlatList
        style={{marginTop: '20%'}}
        data={recipes}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Image source={{url: item.thumbnail}} style={{width: 70, height: 70}}/>
          </View>
        )} />
      <TextInput
        style={input}
        value={searchTerm}
        placeholder="keywords"
        onChangeText={(searchTerm) => setSearchTerm(searchTerm)} />
      <Button
        title="Find"
        onPress={getRecipe} />
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
  input: { 
    fontSize: 18, 
    width: 200, 
    backgroundColor: 'lightgray', 
  }
});
