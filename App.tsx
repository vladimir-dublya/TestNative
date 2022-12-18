import React from 'react';
import type {Node} from 'react';
import {LoginPage} from './pages/LoginPage.tsx';
import {MainPage} from './pages/MainPage.tsx';

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
              backgroundColor: '#794F9C',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
