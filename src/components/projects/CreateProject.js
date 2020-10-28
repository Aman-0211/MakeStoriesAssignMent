import React, { useState } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

const CreateProject = ({ auth, profile, ...props }) => {
  const [value, setValue] = useState({
    title: "",
    content: "",
  });

  console.log(value);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    props.createProject(value, auth.uid, profile);
    props.history.push("/");
  };

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className="container">
      <form className="white col s12" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Create a New Stories</h5>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              placeholder="Story Title"
              id="title"
              onChange={handleChange}
            />
            {/* <label htmlFor="title">Story Title</label> */}
          </div>
        </div>
        <div className="input-field">
          <textarea
            id="content"
            placeholder="Story Content"
            className="materialize-textarea"
            onChange={handleChange}
          ></textarea>
          {/* <label htmlFor="content">Story Content</label> */}
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Publish Story</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project, authId, profile) =>
      dispatch(createProject(project, authId, profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
