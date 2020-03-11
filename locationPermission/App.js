import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [input, setInput] = useState('');

  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
    console.log('current location', location)
  }, []);

  const getLocation = async () => {
    //Check permission
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access to location');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      });
    }
  };

  const APIkey = 'dpJDg178G0XSAC5tK3NSLSexLqsdgn2k';

  const showMap = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/batch?key=${APIkey}&location=${input}`
    )
      .then(response => response.json())
      .then(responseJson => {
        setLocation({
          latitude: responseJson.results[0].locations[0].displayLatLng.lat,
          longitude: responseJson.results[0].locations[0].displayLatLng.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        });
        console.log(location)
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }} region={location}>
        <Marker
          coordinate={location}
          title="Location found!"
        />
      </MapView>
      <View style={styles.input}>
        <TextInput
          style={{ width: 300, backgroundColor: 'lightgray', borderColor: "black", borderWidth: 1 }}
          value={input}
          onChangeText={text => setInput(text)}
        />
      </View>
      <View>
        <Button onPress={showMap} title="SEARCH LOCATION" color="blue" />
      </View>
      <View style={{ marginBottom: "10%" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});