import React from 'react';
import { toast } from 'react-toastify';
import EditPost from './editPost';

const NewPost = (props) => {
  toast.dismiss();
  return (
    <div className="create-note">
      <EditPost oldHistory={props.history} />
    </div>
  );
};

export default NewPost;
