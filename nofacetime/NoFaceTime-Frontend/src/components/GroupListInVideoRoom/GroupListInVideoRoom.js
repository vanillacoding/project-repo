import React, { useState } from 'react';
import styles from './GroupListInVideoRoom.module.css';

import { sendMailToMembers } from '../../api';
//sendMailToMembers = async (sender, receiver, roomLink, groupId)
import CompleteButton from '../CompleteButton/CompleteButton';

const GroupListInVideoRoom = ({
  groups,
  sender
}) => {
  const [isShowMembers, setIsShowMembers] = useState(false);
  const [clickedGroupId, setClickedGroupId] = useState("");
  const [membersToShow, setMembersToShow] = useState([]);

  const roomLink = document.location.href;

  const onGroupNameClick = (clickedGroupId) => {
    if (!clickedGroupId) {
      alert('초대할 그룹을 선택해주세요!');
      return;
    }
    setIsShowMembers(!isShowMembers);
    setClickedGroupId(clickedGroupId);

    groups.forEach((group) => {
      if (group._id === clickedGroupId) {
        setMembersToShow(group.members);
      }
    });
  };

  return (
    <div className={styles.GroupListInVideoRoom}>
      <div
        className={styles.SendMailButton}>
        <CompleteButton
          buttonName="Send Mail"
          onClick={() => {
            sendMailToMembers(sender, membersToShow, roomLink, clickedGroupId);
          }} />
      </div>
      {
        groups.map((group, index) => {
          return (
            <div className={styles.GroupEntry}>
              <label className={styles.GroupLabel}>
                <input type='radio' name='groupCheckbox' />
                <div
                  key={index}
                  id={group._id}
                  className={styles.GroupName}
                  onClick={(e) => {
                    onGroupNameClick(e.target.id);
                  }} >
                  {group.name}
                  {
                    isShowMembers &&
                    group._id === clickedGroupId &&
                    membersToShow.map((member) => {
                      return (
                        <div
                          onClick={(e) => console.log("E TARGET", e.target)}>
                          {member}
                        </div>);
                    })
                  }
                </div>
              </label>
            </div>
          );
        })
      }
    </div >
  );
};

export default GroupListInVideoRoom;
