import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPosts, deletePost, updateSearch } from '../actions';
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
              <div className="parent" key={parent}>{parent}</div>
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

  // Get Intersection of posts filtered by tag and filtered by search
  const intersectArrays = () => {
    return props.filteredPosts.filter((post) => props.searchedPosts.includes(post));
  };

  const chooseCardsToRender = () => {
    if (props.checkedTags.size === 0) {
      if (props.searchedTerm.length === 0) {
        // Render every post if there are no tags and no search term
        return props.all;
      } else {
        // Render only posts filtered by search term if there are no tags
        return props.searchedPosts;
      }
    } else if (props.searchedTerm.length === 0) {
      // Render only posts filtered by tag if there are no search terms
      return props.filteredPosts;
    } else {
      // Render intersection of both filters when they both have conditions
      return intersectArrays();
    }
  };

  return (
    <div>
      <TagFilters />
      <input id="searchbar"
        type="text"
        onChange={(e) => { props.updateSearch(e.target.value); }}
        placeholder="Search by animal type (blue), parent (pink), or pet name"
      />
      <div className="cards-container">
        {chooseCardsToRender().length > 0 ? renderCards(chooseCardsToRender()) : renderNoResult()}
      </div>
    </div>
  );
};

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => ({
  all: state.posts.all,
  checkedTags: state.posts.checkedTags,
  searchedTerm: state.posts.searchedTerm,
  filteredPosts: state.posts.filteredPosts,
  searchedPosts: state.posts.searchedPosts,
});

export default connect(mapStateToProps, { fetchPosts, deletePost, updateSearch })(Posts);
