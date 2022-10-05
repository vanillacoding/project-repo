import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },
  userHabitWrapper: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: '#FACC7D'
  },
  habitInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 255
  },
  iconWrapper: {
    backgroundColor: '#F9BC56',
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
  },
  habitInfo: {
    height: '80%',
    justifyContent: 'space-evenly',
    marginLeft: 20
  },
  name: {
    color: 'white',
    fontWeight: '900',
    fontSize: 30
  },
  dayMateLike: {
    justifyContent: 'space-evenly',
    height: '60%'
  },
  day: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  mate: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  like: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  status: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  cancelWrapper: {
    justifyContent: 'flex-start',
    height: '90%',
    marginLeft: 10
  },
  addBtnWrapper: {
    top: 15
  }
});

export default styles;
