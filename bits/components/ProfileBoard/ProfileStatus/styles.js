import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  profileTopWrapper: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  profileImgWrapper: {
    marginTop: 7,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray'
  },
  actMateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '45%'
  },
  actWrapper: {
    alignItems: 'center'
  },
  actText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0A935',
    padding: 5
  },
  actCountText: {
    color: '#E0A935'
  },
  mateWrapper: {
    alignItems: 'center'
  },
  mateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0A935',
    padding: 5
  },
  mateCountText: {
    color: '#E0A935'
  },
  doneStatusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
    marginTop: 5
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0A935'
  },
  divideLine: {
    borderWidth: 0.5,
    marginTop: 5,
    borderColor: '#E0A935',
    width: '65%'
  }
});

export default styles;
