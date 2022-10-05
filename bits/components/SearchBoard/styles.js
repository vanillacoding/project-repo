import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  followMateWrapper: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1
  },
  searchBarWrapper: {
    alignItems: 'center'
  },
  searchBar: {
    marginTop: 10,
    width: '83%',
    height: 40,
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center'
  },
  searchIcon: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 10,
    width: '80%',
    height: '100%'
  },
  recommendText: {
    marginTop: 20,
    marginLeft: 24,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 12,
    color: '#E4B356'
  },
  scroll: {
  },
  mateWrapper: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  userProfileWrapper: {
    paddingLeft: 5,
    paddingRight: 5
  },
  userProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray'
  },
  userNameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  userName: {
    color: 'gray',
    fontWeight: '800',
    fontSize: 12
  },
  followIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30
  },
  followButton: {
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
