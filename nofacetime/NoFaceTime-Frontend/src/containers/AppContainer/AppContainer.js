import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers,
  createActionToJoinMembersInRoom,
  createActionToDeleteMembersInRoom,
  createActionToAddMessage,
  createActionToSecretMessage
} from '../../actions';

import RoomContainer from '../RoomContainer/RoomContainer';
import GroupContainer from '../GroupContainer/GroupContainer';
import VideoContainer from '../VideoContainer/VideoContainer';
import Home from '../../components/Home/Home';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

const AppContainer = ({
  isLoggedIn,
  currentUser,
  updateUserData,
  memberInRoom,
  joinMember,
  deleteLeavingMember
}) => {
  const roomLink = useRouteMatch("/rooms/:roomId");

  const checkRoomInvitationLink = () => {
    if (!roomLink) return;

    localStorage.roomLink = roomLink.url;
    localStorage.roomUUID = roomLink.params.roomId;
  };

  return (
    <div>
      <Switch>
        {
          isLoggedIn
            ? <>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route path='/login'>
                <Redirect to='/rooms' />
              </Route>
              <Route exact path='/rooms'>
                <RoomContainer />
              </Route>
              <Route path='/groups'>
                <Header />
                <GroupContainer />
              </Route>
              <Route
                path='/rooms/:id'
                render={(props) =>
                  <VideoContainer
                    location={props.location}
                    currentUser={currentUser}
                    memberInRoom={memberInRoom}
                    joinMember={joinMember}
                    deleteLeavingMember={deleteLeavingMember}
                  />}
              />
            </>
            : <>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route path='/login'>
                <Header />
                <Login
                  currentUser={currentUser}
                  updateUserData={updateUserData} />
              </Route>
              <Route path='/rooms'>
                {
                  checkRoomInvitationLink()
                }
                <Redirect to='/login' />
              </Route>
              <Route path='/groups'>
                <Redirect to='/login' />
              </Route>
            </>
        }
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userReducer, memberInRoomReducer, messageListReducer } = state;

  return {
    currentUser: userReducer,
    isLoggedIn: userReducer.isLoggedIn,
    memberInRoom: memberInRoomReducer,
    messageList: messageListReducer.public,
    secretMessageList: messageListReducer.secret
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => { dispatch(createActionForUserData(userData)); },
    addRooms: (addedRoomData) => { dispatch(createActionToAddRoom(addedRoomData)); },
    deleteRooms: (id) => { dispatch(createActionToDeleteRoom(id)); },
    addGroups: (addedGroupData) => { dispatch(createActionToAddGroup(addedGroupData)); },
    deleteGroups: (arrayOfId) => { dispatch(createActionToDeleteGroups(arrayOfId)); },
    addMembers: (groupId, allMemberData) => { dispatch(createActionToAddMembers(groupId, allMemberData)); },
    deleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); },
    joinMember: (socketId) => { dispatch(createActionToJoinMembersInRoom(socketId)); },
    deleteLeavingMember: (socketId) => { dispatch(createActionToDeleteMembersInRoom(socketId)); },
    addMessage: (message) => { dispatch(createActionToAddMessage(message)); },
    addSecretMessage: (message) => { dispatch(createActionToSecretMessage(message)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
