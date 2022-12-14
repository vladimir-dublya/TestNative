import React from 'react';
import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{title: 'Main'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
