import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { updateWinnerScore } from "../../api/gameApi";
import { checkModeratorStats, checkPartnerStatus } from "../../utils/moderatorStatus";
import { NUMBERS } from "../../constants";
import styles from "./GameEndModal.module.css";

const GameEndModal = ({ userScore, socket }) => {
  const email = useSelector(state => state.user.email);
  const userSocketId = useSelector(state => state.user.socketId);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);

  const isPartnerWinner = !isModerator && userScore === NUMBERS.WIN_SCORE;
  const isModeratorWinner = isModerator && userScore === NUMBERS.WIN_SCORE;

  let partnerStatus = null;
  let moderatorStatus = null;

  useEffect(() => {
    if (isModeratorWinner || isPartnerWinner) {
      updateWinnerScore(email);
    }
  }, []);

  const handleHomeButtonClick = () => {
    socket.emit("leaveRoom", { userSocketId, partnerSocketId });
    socket.emit("destroyPeer", { userSocketId, partnerSocketId });
  };

  partnerStatus = checkPartnerStatus(isPartnerWinner);
  moderatorStatus = checkModeratorStats(isModeratorWinner);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.statusWrapper}>
        {isModerator && moderatorStatus}
        {!isModerator && partnerStatus}
      </div>
      <div
        className={styles.buttonWrapper}
        onClick={handleHomeButtonClick}
      >
        <p>HOME</p>
      </div>
    </div>
  );
};

export default GameEndModal;

GameEndModal.propTypes = {
  userScore: PropTypes.number.isRequired,
  socket: PropTypes.object.isRequired,
};
