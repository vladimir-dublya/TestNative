import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LoginStack from './navigate.js';

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <View>
        <LoginStack />
      </View>
    </SafeAreaView>
  );
};

export default App;
