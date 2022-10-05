import { StyleSheet } from 'react-native';


const ChatLeftMsgsStyles = StyleSheet.create({
  yourMsgsWrap: {
    flex: 1,
    marginBottom: 4,
  },
  yourMsg: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 0,
    marginRight: 8,
  },
  avatar: {
    backgroundColor: '#C86DD7',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#929292',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
  },
  leftMsgContainerMsgs: {
    flexDirection: 'column',
  },
  nicknameText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  leftMsgBoxNewWrap: {
    flexDirection: 'row',
  },
  msgBox: {
    padding: 8,
    backgroundColor: '#fff',
    marginLeft: 8,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    maxWidth: 162,
  },
  msgFont: {
    fontSize: 16,
  },
  leftMsgContainerModeDates: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginLeft: 4,
  },
  yourMsgMicIconWrap: {
  },
  micIcon: {
    width: 13,
    height: 21,
    marginLeft: 4,
  },
  msgDateWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  yourMsgDate: {
    marginLeft: 4,
    color: '#AAA',
    fontSize: 12,
  },
});

export default ChatLeftMsgsStyles;