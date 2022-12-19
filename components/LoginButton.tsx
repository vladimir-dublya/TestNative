import React from 'react';
import { styles } from '../styles/styles.js';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export const LoginButton: React.FC<Props> = ({title, onPress}) => {
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
