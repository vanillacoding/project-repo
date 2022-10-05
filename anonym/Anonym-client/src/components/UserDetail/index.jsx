import React from "react";
import useUpdateUserName from "../../hooks/useUpdateUserName";
import { useSelector } from "react-redux";
import useUpdateUserThumnail from "../../hooks/useUpdateUserThumnail";

function UserDetail() {
  const { userName, thumnail } = useSelector((state) => state.auth.userInfo);
  const {
    newName,
    updateNewName,
    isUpdateUserName
  } = useUpdateUserName(userName);
  const {
    newThumnail,
    updateNewThumnail,
    imageInputRef,
    isUpdateUserThumnail
  } = useUpdateUserThumnail();

  return (
    <div className="content-wrapper profile">
      <div>
        <h3 className="profile__title">Profile</h3>
      </div>
      <div>
        <h4>User Thumnail</h4>
        <img className="user-thumnail" src={thumnail} alt="user thumnail" />
        <form>
          <input
            type="file"
            accept="image/*"
            value={newThumnail}
            className="user-thumnail__input"
            onChange={(e) => {
              updateNewThumnail(e.target.value);
            }}
            ref={imageInputRef}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              isUpdateUserThumnail(true);
            }}
            disabled={
              newThumnail ? false : true
            }
          >
            save
          </button>
        </form>
      </div>
      <div>
        <div>
          <h4>User Name</h4>
          <div>
            <form>
              <input
                type="text"
                className="input-text"
                value={newName}
                onChange={(e) => {
                  updateNewName(e.target.value.trim());
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  isUpdateUserName(true);
                }}
                disabled={
                  userName === newName ? true : false
                }
              >
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
