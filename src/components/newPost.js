import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import EditPost from './editPost';
import { clearError } from '../actions';

const NewPost = (props) => {
  useEffect(() => {
    // Remove toasts from previous pages
    toast.dismiss();
    props.clearError();
  }, []);

  return (
    <div className="create-note">
      <EditPost oldHistory={props.history} />
    </div>
  );
};

export default connect(null, { clearError })(NewPost);
