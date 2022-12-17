import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../styles/styles.js';

export const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View>
        <TextInput
          secureTextEntry={label === 'password'}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
          }}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};
