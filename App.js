import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Navigate} from './navigate.js';
import {MainPage} from './pages/MainPage.js';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <View>
        <MainPage />
      </View>
    </SafeAreaView>
  );
};

export default App;
