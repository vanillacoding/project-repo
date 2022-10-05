import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mateHabitWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  mateLivewrapper: {
    paddingTop: 10,
    paddingBottom: 10
  },
  profileImg: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  uriWrapper: {
    marginLeft: 10,
    paddingRight: 10
  },
  profileUriImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray'
  },
  img: {
    marginLeft: 3,
    paddingRight: 7
  },
  name: {
    marginLeft: 4,
    fontWeight: '500'
  },
  habitWrapper: {
    backgroundColor: '#E8C06C',
    margin: 8,
    borderRadius: 10,
    width: 100,
    height: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  statusTextWrapper: {
    width: '100%'
  },
  statusText: {
    textAlign: 'right',
    color: 'white',
    marginRight: 10,
    fontSize: 10
  },
  habitIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  startTimeText: {
    color: 'white',
    fontWeight: '800'
  }
});

export default styles;
