import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { storage } from "../../config/fbConfig";
import { updateProfile } from "../../store/actions/projectActions";

const Profile = ({ profile, updateProfile, auth, ...props }) => {
  const [profileValue, setProfile] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setProfile({
      ...profileValue,
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  }, []);

  const handelChange = (e) => {
    if (e.target.files[0]) {
      setProfile({
        ...profileValue,
        profilePic: e.target.files[0],
      });
    }
  };

  const handelEdit = (event) => {
    event.preventDefault();
    setIsEdit(true);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    let uploadProfile = storage
      .ref(`images/${profileValue.profilePic.name}`)
      .put(profileValue.profilePic);
    uploadProfile.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(profileValue.profilePic.name)
          .getDownloadURL()
          .then((url) => {
            updateProfile(auth.uid, url);
          });
      }
    );
  };

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className="container">
      <div className="row">
        <form className="white col s12" onSubmit={handelSubmit}>
          <div className="row">
            <div className="input-field col s6 ">
              <h5 className="center">{isEdit ? "Edit Profile" : "Profile"}</h5>
            </div>
            <div
              style={{
                paddingTop: "15px",
                paddingLeft: "3rem",
              }}
            >
              <button
                className="btn waves-effect waves-light"
                onClick={handelEdit}
                name="action"
              >
                Edit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
          {isEdit && (
            <div className="row">
              <div className="input-field col center">
                <input
                  placeholder="Change Profile Pic"
                  onChange={handelChange}
                  id="profilePic"
                  type="file"
                  className="validate"
                />
              </div>
              <button className="waves-effect waves-light btn">
                <i className="material-icons left">cloud</i>Upload
              </button>
            </div>
          )}

          <div className="row">
            <div className="input-field col s12">
              <input
                disabled={!isEdit}
                placeholder="First Name"
                id="firstName"
                value={profileValue.firstName}
                type="text"
                className="validate"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                disabled={!isEdit}
                id="lastName"
                value={profileValue.lastName}
                type="text"
                placeholder="Last Name"
                className="validate"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (authId, profileValue) =>
      dispatch(updateProfile(authId, profileValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
