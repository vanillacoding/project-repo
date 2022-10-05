import React from 'react';
import GroupList from '../GroupList/GroupList';
import MemberList from '../MemberList/MemberList';

const Group = ({
  currentUser,
  showMember,
  setShowMember,
  getMemberData,
  handleCheckbox,
  targetGroupId,
  saveTargetGroupId
}) => {

  return (
    <>
      {showMember ?
        <MemberList
          currentUser={currentUser}
          targetGroupId={targetGroupId}
          setShowMember={setShowMember}
          handleCheckbox={handleCheckbox} />
        :
        <GroupList
          groups={currentUser.groups}
          onGroupItemClick={getMemberData}
          onGroupNameClick={saveTargetGroupId}
          handleCheckbox={handleCheckbox} />
      }
    </>
  );
};

export default Group;
