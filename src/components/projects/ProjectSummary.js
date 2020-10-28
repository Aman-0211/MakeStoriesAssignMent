import React from "react";

const ProjectSummary = ({ story }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{story.title}</span>
        <span className="card-title ">{story.content}</span>
        <p>
          Posted by {story.authorFirstName}
          {story.authorLastName}
        </p>
        <p className="grey-text">3rd September, 2am</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
