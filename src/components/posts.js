import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPosts, deletePost } from '../actions';
import CoverImg from './coverImg';
import TagFilters from './tagFilters';

const Posts = (props) => {
  useEffect(() => {
    props.fetchPosts();
    toast.dismiss();
  }, []);

  const renderCards = (posts) => {
    return (posts.map((post) => (
      <div className="card" key={post.id}>
        <NavLink exact to={`/posts/${post.id}`} className="card">
          <CoverImg srcImg={post.coverUrl} tags={post.tags} />
          <div className="name">{post.title}</div>
          <div>
            <div className="tags">{post.tags}</div>
            {post.parents.map((parent) => (
              <div className="parent" key={parent}>Parent: {parent}</div>
            ))}
          </div>
        </NavLink>
      </div>
    )));
  };

  const renderNoResult = () => {
    return (
      <div className="no-result">
        <div className="message"> There are no posted pets matching your search filters... but you can change that!</div>
        <NavLink exact to="/posts/new">Upload a Pet</NavLink>
      </div>
    );
  };

  return (
    <div>
      <TagFilters />
      <div className="cards-container">
        {props.checkedTags.size === 0 ? renderCards(props.all) : renderCards(props.filteredPosts)}
        {props.checkedTags.size > 0 && props.filteredPosts.length === 0 ? renderNoResult() : ''}
      </div>
    </div>
  );
};

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => ({
  all: state.posts.all,
  checkedTags: state.posts.checkedTags,
  filteredPosts: state.posts.filteredPosts,
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(Posts);
