import React from 'react';
import EditPost from './editPost';

const ExpandedPost = (props) => {
  return (
    <div className="expanded-post">
      <EditPost postID={props.match.params.postID} oldHistory={props.history} />
    </div>
  );
};

export default ExpandedPost;
