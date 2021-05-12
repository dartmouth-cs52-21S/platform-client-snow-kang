import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from 'react-modal';
import {
  createPost, updatePost, deletePost, fetchPost,
} from '../actions';
import CoverImg from './coverImg';

const fallbackSrc = require('../img/mysteryDog.png');

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: '',
      showModal: false,
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
    ReactModal.setAppElement('#main');
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
        ...prevState,
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

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

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
      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20vh 5vw',
          background: 'pink',
        },
      };
      return (
        <div className="preview-post">
          <ReactModal
            isOpen={this.state.showModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Deletion Modal"
          >
            <h2>WHAT????</h2>
            <p>Look, it&apos;s not too late to change your mind. <br />I gain a lot of joy from getting compliments. Please don&apos;t take my joy away...please</p>
            <div className="buttons">
              <div id="delete-post" role="button" tabIndex="0" onClick={this.handleDelete}>Delete and accept you are heartless</div>
              <div id="keep-post" role="button" tabIndex="0" onClick={this.closeModal}>Keep and allow me to continue receiving my positive affirmations</div>
            </div>
          </ReactModal>
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
              <input type="button" onClick={this.openModal} value="Delete me?? You wouldn&apos;t, would you?!" />
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
