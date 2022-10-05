import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topNavWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderColor: 'black',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F9BC56',
  },
  iconNameWrapper: {
    flexDirection: 'row',
    marginLeft: 20
  },
  icon: {
    marginRight: 10
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'grey'
  },
  name: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  gearWrapper: {
    marginRight: 20
  }
});

export default styles;
