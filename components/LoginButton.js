import React from 'react';
import {styles} from '../styles/styles.js';
import {TouchableOpacity, Text} from 'react-native';

export const LoginButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        title === 'Login'
          ? [styles.loginBtn, styles.container]
          : [styles.logoutBtn, styles.container]
      }>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
