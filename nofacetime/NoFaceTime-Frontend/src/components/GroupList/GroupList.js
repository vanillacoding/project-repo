import React from 'react';
import styles from './GroupList.module.css';

const GroupList = ({
  //currentUser,
  //getMemberData, //onGroupItemClick
  //handleCheckbox
  groups,
  onGroupItemClick,
  onGroupNameClick,
  handleCheckbox
}) => {
  const groupList = groups ? groups.map((group, index) => {
    const groupId = group._id;

    return (
      <div
        key={index}
        className={styles.GroupEntry}>
        <input
          type='checkbox'
          onChange={() => handleCheckbox(groupId)} />
        <div
          key={index}
          className={styles.GroupName}
          onClick={() => {
            onGroupItemClick(groupId);
            onGroupNameClick(groupId);
          }}>
          {group.name}
        </div>
      </div>

    );
  }) : undefined;

  return (
    <div className={styles.GroupList}>
      {groupList}
    </div>
  );
};

export default GroupList;
