export const checkModeratorStats = (isModeratorWinner) => {
  if (isModeratorWinner) {
    return (
      <div>
        WINNER
      </div>
    );
  } else {
    return (
      <div>
        LOSER
      </div>
    );
  }
};

export const checkPartnerStatus = (isPartnerWinner) => {
  if (isPartnerWinner) {
    return (
      <div>
        WINNER
      </div>
    );
  } else {
    return (
      <div>
        LOSER
      </div>
    );
  }
};
