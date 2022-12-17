import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Loader} from '../components/Loader.js';
import Snackbar from 'react-native-snackbar';
import {LoginButton} from '../components/LoginButton.js';
import {styles} from '../styles/styles.js';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import {Data, Comments} from '../types/mainPage.ts';

export const MainPage: React.FC = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForComments, setIsLoadingForComments] = useState(true);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  NetInfo.fetch().then(state => {
    setIsConnected(state.isConnected);
  });

  const handleOpen = choosenId => {
    setOpen(true);
    setIsLoadingForComments(true);
    const getCommentsFromApi = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${choosenId}/comments`,
      );
      const json = await response.json();
      setIsLoadingForComments(false);
      setComments(json);
    };

    try {
      getCommentsFromApi();
    } catch (error) {
      setOpen(false);
      Snackbar.show({
        text: 'Сталась помилка',
      });
    }
  };

  const handleLogin = () => {
    navigation.goBack();
  };
  const getArticlesFromApi = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/',
      );
      const json = await response.json();
      setIsLoading(false);
      setData(json);
    } catch {
      Snackbar.show({
        text: 'Сталась помилка',
        action: {
          text: 'Повторити запит',
          textColor: 'green',
          onPress: () => {
            getArticlesFromApi();
          },
        },
      });
    }
  };

  useEffect(() => {
    getArticlesFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LoginButton title="Log Out" onPress={handleLogin} />,
    });
  });

  return (
    <View>
      {!isConnected && (
        <Text style={styles.noConnection}>Не має інтернет з'єднання</Text>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={styles.containerItemList}>
                    <TouchableOpacity
                      onPress={() => {
                        handleOpen(item.id);
                      }}>
                      <Text style={styles.listItem}>{item.title}</Text>
                      <Text>{item.body}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
      <Modal
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <TouchableOpacity onPress={() => setOpen(false)} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.modalContainer}>
                {isLoadingForComments ? (
                  <Loader />
                ) : (
                  <FlatList
                    data={comments}
                    renderItem={comment => {
                      console.log(comment.item.body);
                      return (
                        <View>
                          <Text>{comment.item.email}</Text>
                          <Text>{comment.item.body}</Text>
                        </View>
                      );
                    }}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
