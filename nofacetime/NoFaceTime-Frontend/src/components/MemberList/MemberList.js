import React from 'react';
import styles from './MemberList.module.css';

const MemberList = (props) => {
  const {
    currentUser,
    targetGroupId,
    setShowMember,
    handleCheckbox
  } = props;
  const targetGroup = currentUser.groups.filter(group => group._id === targetGroupId)[0];
  const targetMember = targetGroup.members;
  const existMemberList = targetMember.map((memberEmail, index) => {
    return (
      <div
        key={index}
        className={styles.MemberEntry}>
        <input
          type='checkbox'
          onChange={() => handleCheckbox(memberEmail)}
        />{memberEmail}
      </div>
    );
  });

  return (
    <>
      <div className={styles.MemberList}>
        {existMemberList}
      </div>
      <button
        className={styles.BackButton}
        onClick={() => {
          setShowMember(false);
        }}>Go Back
      </button>
    </>
  );
};

export default MemberList;
