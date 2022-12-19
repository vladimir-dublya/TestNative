import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Loader} from '../components/Loader';
import Snackbar from 'react-native-snackbar';
import {LoginButton} from '../components/LoginButton';
import {styles} from '../styles/styles.js';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import {Dirs, FileSystem} from 'react-native-file-access';

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type Data = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const MainPage: React.FC = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForComments, setIsLoadingForComments] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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
      await FileSystem.writeFile(
        Dirs.CacheDir + 'savedData.txt',
        JSON.stringify(json),
      );
      setIsLoading(false);
      setData(json);
    } catch (error) {
      if (!isConnected) {
        const text = await FileSystem.readFile(Dirs.CacheDir + 'savedData.txt');
        setIsLoading(false);
        setData(JSON.parse(text));
      }
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
