import React, {useEffect, useState, Modal} from 'react';
import {Header, Button, View, FlatList} from 'react-native';
import {Loader} from '../components/Loader.js';
import Snackbar from 'react-native-snackbar';

export const MainPage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsLoading(true);
    const getCommentsFromApi = async () => {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts/');
      let json = await response.json();
      setIsLoading(false);
      setComments(json);
      return json;
    };

    try {
      getCommentsFromApi;
    } catch (error) {
      Snackbar.show({
        text: 'Сталась помилка',
      });
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginPage');
  };

  useEffect(() => {
    const getArticlesFromApi = async () => {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts/');
      let json = await response.json();
      setIsLoading(false);
      setData(json);
      return json;
    };

    try {
      getArticlesFromApi;
    } catch (error) {
      Snackbar.show({
        text: 'Сталась помилка',
        action: {
          text: 'Повторити запит',
          textColor: 'green',
          onPress: () => {
            getArticlesFromApi;
          },
        },
      });
    }
  }, []);

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <Header>
            <Button title="Log Out" onPress={handleLogin} />
          </Header>
          <View>
            {data.map(item => (
              <View>
                <FlatList
                  title={item.title}
                  subtitle={item.body}
                  onClick={handleOpen}
                />
                <Modal
                  visible={open}
                  onRequestClose={() => {
                    setOpen(false);
                  }}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <FlatList
                      title={
                        comments.find(com => item.id === com.postsId).title
                      }
                      subtitle={
                        comments.find(com => item.id === com.postsId).body
                      }
                    />
                  )}
                </Modal>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
