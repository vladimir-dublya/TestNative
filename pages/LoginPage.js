import React, {useState} from 'react';
import {View} from 'react-native';
import {Input} from '../components/Input.js';
import {LoginButton} from '../components/LoginButton.js';
import {styles} from '../styles/styles.js';

export const LoginPage = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    if (!inputs.email) {
      handleError('Please enter email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleError('Please enter password', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('Enter more than 5 symbols', 'password');
      valid = false;
    }

    valid && navigation.navigate('MainPage');
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <View style={[styles.container, styles.containerOut]}>
      <View style={styles.container}>
        <Input
          iconName="email-outline"
          label="Email"
          placeholder="Enter your email"
          onChangeText={text => handleOnChange(text, 'email')}
          error={errors.email}
          onFocus={() => handleError(null, 'email')}
          style={styles.inputView}
        />
        <Input
          iconName="lock-outline"
          label="password"
          placeholder="Enter your password"
          password
          onChangeText={text => handleOnChange(text, 'password')}
          error={errors.password}
          style={styles.inputView}
          onFocus={() => handleError(null, 'password')}
        />
      </View>
      {inputs.email && inputs.password && (
        <LoginButton title="Login" onPress={validate} />
      )}
    </View>
  );
};
