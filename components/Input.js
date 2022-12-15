import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <Text style={{marginBottom: 20}}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {borderColor: error ? 'red' : isFocused ? 'blue' : 'gray'},
        ]}>
        <TextInput
          secureTextEntry={label === 'password'}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: 'blue', flex: 1}}
          {...props}
        />
      </View>
      {error && (
        <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>{error}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: 'grey',
  },
  inputContainer: {
    height: 55,
    backgroundColor: 'gray',
    flexdirection: 'column',
  },
});
