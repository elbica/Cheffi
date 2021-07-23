import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {TouchOpacity} from '../components/PageMove';

export default function HomePage({navigation}) {
  return (
    <View>
      <Text>home</Text>
      <Button title="hihihi" onPress={() => navigation.navigate('test')} />
      <TouchOpacity navigation={navigation} goal="test">
        <Text>hellohelloo</Text>
      </TouchOpacity>
    </View>
  );
}
