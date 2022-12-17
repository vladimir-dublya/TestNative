import React from 'react';
import type {Node} from 'react';
import {LoginPage} from './pages/LoginPage.js';
import {MainPage} from './pages/MainPage.js';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{
            title: 'MainPage',
            headerStyle: {
              backgroundColor: '#B25FB4',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
