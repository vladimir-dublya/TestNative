import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {Header} from 'react-native-elements';
import {Loader} from '../components/Loader.js';
import Snackbar from 'react-native-snackbar';
import {CustomButton} from '../components/CustomButton.js';
import Modal from 'react-native-modal';

export const MainPage: React.FC = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = choosenId => {
    setOpen(true);
    setIsLoading(true);
    const getCommentsFromApi = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${choosenId}/comments`,
      );
      const json = await response.json();
      setIsLoading(false);
      setComments(json);
    };

    try {
      getCommentsFromApi();
    } catch (error) {
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

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <Header
            placement="left"
            rightComponent={
              <CustomButton title="Log Out" onPress={handleLogin} />
            }
          />
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={styles.containerItemList}>
                    <Text
                      style={styles.listItem}
                      onPress={() => {
                        handleOpen(item.id);
                      }}>
                      {item.title}
                    </Text>
                    <Text>{item.body}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
      <Modal
        visible={open}
        style={{width: '100%', height: '100%', backgroundColor: 'blue'}}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <View>
          {isLoading ? (
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    fontSize: 20,
    backgroundColor: 'green',
  },

  containerItemList: {
    height: 120,
    marginBottom: 30,
    borderColor: 'black',
    borderRadius: 2,
    borderWidth: 1,
  },
});
