import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

const ProjectList = ({ stories }) => {
  console.log(stories);
  return (
    <div className="project-list section">
      {stories &&
        stories.map((story) => {
          return (
            <Link to={"/story/" + story.id} key={story.id}>
              <ProjectSummary story={story} />
            </Link>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "stories" }])
)(ProjectList);
