import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerOut: {
    height: '100%',
  },

  inputView: {
    borderRadius: 30,
    padding: 10,
    width: 200,
    height: 45,
    backgroundColor: '#AAA5C8',
  },

  textOnInput: {
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
  },

  loginBtn: {
    height: 30,
    width: '80%',
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: '#8075BB',
  },

  logoutBtn: {
    height: 30,
    width: 100,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: '#8075BB',
  },

  header: {
    backgroundColor: '#D8A2D1',
  },

  listItem: {
    fontSize: 20,
    backgroundColor: '#B25FB4',
  },

  noConnection: {
    fontSize: 30,
  },

  containerItemList: {
    height: 120,
    marginBottom: 30,
    borderColor: '#B25FB4',
    borderRadius: 2,
    borderWidth: 2,
  },

  modalContainer: {
    width: '70%',
    height: '80%',
    backgroundColor: '#C170C3',
  },

  horizontal: {
    padding: 10,
  },
});
