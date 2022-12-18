import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../styles/styles.js';

type Props = {
  label: string;
  error: string;
  onFocus: () => void;
  onChangeText: (string) => void;
  placeholder: string;
};

export const Input: React.FC<Props> = ({
  label,
  error,
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
