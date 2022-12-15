import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export const CustomButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
