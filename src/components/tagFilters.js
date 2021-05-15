import React from 'react';
import { connect } from 'react-redux';
import { toggleFilterTag } from '../actions';

export const possibleTags = ['dog', 'cat', 'turtle', 'fish', 'chinchilla', 'other'];

const TagFilters = (props) => {
  return (
    <div className="tag-filters">
      { possibleTags.map((tag) => (
        <label key={tag} htmlFor={tag}>
          <input type="checkbox" id={tag} checked={props.checkedTags.has(tag)} onChange={() => { props.toggleFilterTag(tag); }} />
          <span>{tag}</span>
        </label>
      ))}
    </div>
  );
};

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => ({
  checkedTags: state.posts.checkedTags,
});

export default connect(mapStateToProps, { toggleFilterTag })(TagFilters);
