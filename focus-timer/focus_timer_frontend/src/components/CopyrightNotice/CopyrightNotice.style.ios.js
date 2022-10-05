import { StyleSheet } from 'react-native';

export default  StyleSheet.create({
  container: {
    height: '100%',
    padding: 20
  },

  headerContainer:{
    paddingTop: 20,
    flexDirection: 'row',
  },

  headerSettingButtonContainer: {
     flex: 1
  },

  headerTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    flex: 5
  },

  copyrightTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },

  copyrightContentText: {
    paddingBottom: 10
  }
});
