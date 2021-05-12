import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createPost, updatePost, deletePost, fetchPost,
} from '../actions';
import CoverImg from './coverImg';

const fallbackSrc = require('../img/mysteryDog.png');

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        coverUrl: '',
        content: '',
        tags: '',
      },
      isEditing: !this.props.postID, // default is to edit new notes & to preview preexisting ones
    };
  }

  componentDidMount() {
    if (this.props.postID) {
      this.props.fetchPost(this.props.postID);
    }

    // When the user clicks anywhere outside of the modal-content, close the modal
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });
  }

  handleSave = () => {
    for (const key in this.state.post) {
      if (!this.state.post[key]) {
        toast('🐾 Hey!! Leave no treat uneaten and leave no entry unanswered!');
        return;
      }
    }

    if (this.props.postID) {
      this.props.updatePost(this.props.postID, this.state.post, this.props.oldHistory);
    } else {
      this.props.createPost(this.state.post, this.props.oldHistory);
    }
  };

  handleEdit = () => {
    this.setState((prevState) => {
      return {
        post: {
          title: this.props.current.title,
          coverUrl: this.props.current.coverUrl,
          content: this.props.current.content,
          tags: this.props.current.tags,
        },
        isEditing: !prevState.isEditing,
      };
    });
  }

  closeModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  }

  handleDeleteRequest = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
  };

  handleDelete = () => {
    this.props.deletePost(this.props.postID, this.props.oldHistory);
  }

  handleMissingImg = (e) => {
    e.target.onError = null;
    e.target.src = fallbackSrc;
  };

  onInputChange = (e, label) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        post: {
          ...prevState.post,
          [label]: e.target.value,
        },
      };
    });
  }

  renderPostText = () => {
    if (this.state.isEditing) {
      return (
        <div className="edit-post">
          <p>Pet name</p>
          <TextareaAutosize className="post-title"
            onChange={(e) => this.onInputChange(e, 'title')}
            value={this.state.post.title}
          />
          <p>Type of animal (ex. dog, cat)</p>
          <TextareaAutosize className="post-tags"
            onChange={(e) => this.onInputChange(e, 'tags')}
            value={this.state.post.tags}
          />
          <p>Add compliments here! Now is not the time to hold back 😇</p>
          <TextareaAutosize className="post-content"
            onChange={(e) => this.onInputChange(e, 'content')}
            value={this.state.post.content}
          />
          <p>Cover Url</p>
          <TextareaAutosize className="post-coverUrl"
            onChange={(e) => this.onInputChange(e, 'coverUrl')}
            value={this.state.post.coverUrl}
          />
          <div className="icons">
            <i className="fas fa-save" onClick={this.handleSave} role="button" tabIndex="0" label="Save Post" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="preview-post">
          <div className="modal">
            <div className="modal-content">
              <p>Look, it&apos;s not too late to change your mind. I gain a lot of joy from getting compliments. Please don&apos;t take my joy away...please</p>
              <div className="buttons">
                <div id="delete-post" role="button" tabIndex="0" onClick={this.handleDelete}>Delete and accept you are heartless</div>
                <div id="keep-post" role="button" tabIndex="0" onClick={this.closeModal}>Keep and allow me to continue receiving my positive affirmations</div>
              </div>
            </div>
          </div>
          <div className="preview-left-panel">
            <CoverImg srcImg={this.props.current.coverUrl} tags={this.props.current.tags} isEditPage="true" />
            <div className="name">{this.props.current.title}</div>
            <div className="tags">{this.props.current.tags}</div>
          </div>
          <div className="preview-right-panel">
            <div id="fan-mail-title">{this.props.current.title}&apos;s fan mail! 💌 </div>
            <div className="content">
              <ReactMarkdown>{this.props.current.content || ''}</ReactMarkdown>
            </div>
            <div className="buttons">
              <input type="button" onClick={this.handleEdit} value="Give me a compliment" />
              <input type="button" onClick={this.handleDeleteRequest} value="Delete me?? You wouldn&apos;t, would you?!" />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      this.renderPostText()
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.posts.current,
  };
};

export default connect(mapStateToProps, {
  createPost, updatePost, fetchPost, deletePost,
})(EditPost);
