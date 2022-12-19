import React from 'react';
import type { Node } from 'react';
import {LoginPage} from './pages/LoginPage';
import {MainPage} from './pages/MainPage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


type RootStackParamList = {
  LoginPage: undefined;
  MainPage: {
    title: string,
    headerStyle: {
      backgroundColor: string,
    },
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'LoginPage'>;

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
