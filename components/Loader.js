import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from '../styles/styles.js';

export const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#C049C2" />
    </View>
  );
};
