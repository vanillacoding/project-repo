import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20
  },
  headerContainer: {
    flexDirection: 'row'
  },
  mainButtonContainer: {
    flex: 1
  },
  settingsHeaderText: {
    fontSize: 40,
    flex: 2,
  },
  contentContainer: {
    borderTopWidth: 3,
    marginTop: 20
  },
  eachSettingContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  eachSettingTextContainer: {
    justifyContent: 'center'
  },
  eachSettingText: {
    fontSize: 25
  },
});
