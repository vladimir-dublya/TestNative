import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import Input from '../components/Input.js';
import Button from '../components/button.js';

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
      handleError('Password must be more than 5 symbols', 'password');
      valid = false;
    }

    navigation.navigate('MainPage');
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
          Login Page
        </Text>
        <Text>Enter your email</Text>
        <View>
          <Input
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email"
            onChangeText={text => handleOnChange(text, 'email')}
            error={errors.email}
            onFocus={() => handleError(null, 'email')}
          />
          <Input
            iconName="lock-outline"
            label="password"
            placeholder="Enter your password"
            password
            onChangeText={text => handleOnChange(text, 'password')}
            error={errors.password}
            onFocus={() => handleError(null, 'password')}
          />
        </View>
        <Button title="Login" onPress={validate} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  inputView: {
    borderRadius: 30,
    width: '70%',
    height: 45,
    backgroundColor: '#AAA5C8',
    alignItems: 'center',
    marginBottom: 30,
  },

  TextInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8075BB',
  },
});
