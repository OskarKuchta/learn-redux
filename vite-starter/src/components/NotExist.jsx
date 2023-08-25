import React from "react";

const NotExist = () => {

  return (
    <div className="not-exist">
      <h1>You type incorrect link, back to main page</h1>
      <button>
        <a href="/">Back</a>
      </button>
    </div>
  );
};

export default NotExist;
