import { StyleSheet } from 'react-native';

const ChatHeaderbarStyles = StyleSheet.create({
  headerBarContainer: {
    height: 67,
    backgroundColor: '#f1f1f1',
  },
  headerBarBox: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    marginBottom: 30,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  withShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    },
  },
  headerBarLeftWrap: {
    flex: 1,
  },
  headerBarCenterWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerBarRightWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerBarIcon: {
    width: 11,
    height: 18,
  },
  headerBarTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#424242',
    fontWeight: 'bold',
  },
  headerBarText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#424242',
    fontWeight: 'normal',
  },
});

export default ChatHeaderbarStyles;