import axios from 'axios';
import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';

export default function RecommendPage() {
  useEffect(() => {
    axios
      .get('http://18.220.121.204:2001/')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View>
      <Text>RecommendPage</Text>
    </View>
  );
}
