import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function SideNav() {
  const { followings } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="nav-side">
      <div className="nav-side__following-list">
        {
          followings.map((follwing) => (
            <UserCard key={follwing._id} userInfo={follwing} />
          ))
        }
      </div>
    </div>
  );
}

export default SideNav;
