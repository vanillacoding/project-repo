import React from "react";
import useCheckFollow from "../../hooks/useCheckFollow";
import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";

function UserCard({ user }) {
  const isFollow = useCheckFollow(user._id);
  const followUser = useFollow();
  const unfollowUser = useUnfollow();

  return (
    <div className="user-card">
      <div className="user-card__left">
        <img
          className="user-card__thumnail user-thumnail"
          src={user.thumnail}
          alt="user thumnail"
        />
      </div>
      <div className="user-card__right">
        <div className="user-card__description">
          <div className="user-card__user-name">
            {user.userName}
          </div>
          <div className="follower-number">
            {user.followers.length} followers
          </div>
        </div>
        <div className="follow-button-box">
          {
            isFollow ? (
              <button
                className="follow-button"
                onClick={() => {
                  unfollowUser(user._id);
                }}
              >
                unfollow
              </button>
            ) : (
              <button
                className="follow-button"
                onClick={() => {
                  followUser(user._id);
                }}
              >
                follow
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default UserCard;
