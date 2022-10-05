import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  subscribeWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EDCD88',
    borderRadius: 10,
    paddingBottom: 25,
    width: '80%',
    height: '50%',
    paddingBottom: 10
  },
  subscribeText: {
    color: 'white',
    fontWeight: '600',
    marginTop: 20
  },
  inputWrapper: {
    justifyContent: 'space-evenly',
    width: '80%',
    height: '80%'
  },
  actInput: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: '20%',
    borderRadius: 5
  },
  actText: {
    fontWeight: '800',
    color: '#E4B356'
  },
  selectedAct: {
    color: 'gray',
    left: 20,
    fontWeight: '600'
  },
  dayInput: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: '20%',
    borderRadius: 5
  },
  dayText: {
    fontWeight: '800',
    color: '#E4B356'
  },
  selectedDay: {
    color: 'gray',
    left: 20,
    fontWeight: '600'
  },
  timeInput: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: '20%',
    borderRadius: 5
  },
  timeText: {
    fontWeight: '800',
    color: '#E4B356'
  },
  selectedTime: {
    color: 'gray',
    left: 20,
    fontWeight: '600'
  },
  buttonWrapper: {
    width: '40%',
    borderRadius: 8,
    backgroundColor: '#D68C43'
  }
});

export default styles;
