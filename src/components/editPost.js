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

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        coverUrl: '',
        content: '',
        tags: '',
        parents: '',
      },
      newComment: '',
      showModal: false,
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
    // Ensure no field is left empty
    for (const key in this.state.post) {
      if (!this.state.post[key]) {
        toast('🐾 Hey!! Leave no treat uneaten and leave no entry unanswered!');
        return;
      }
    }

    // Ensure no duplicate parents
    const uniqueParents = new Set(this.state.post.parents.split(','));
    const newPost = { ...this.state.post, parents: Array.from(uniqueParents) };

    if (this.props.postID) {
      this.props.updatePost(this.props.postID, newPost, this.props.oldHistory);
    } else {
      this.props.createPost(newPost, this.props.oldHistory);
    }
  };

  handleEdit = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        post: {
          ...prevState.post,
          title: this.props.current.title,
          coverUrl: this.props.current.coverUrl,
          content: this.props.current.content,
          tags: this.props.current.tags,
          parents: this.props.current.parents.join(','),
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
    this.closeModal();
    this.props.deletePost(this.props.postID, this.props.oldHistory);
  }

  handleCommentEdit = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        newComment: e.target.value,
      };
    });
  }

  handleNewCommentSave = () => {
    const comment = this.state.newComment.trim();
    // Disallow empty or duplicate comments
    if (!comment) {
      toast('Hmph! Where is my compliment?? 🥺');
    } else if (this.props.current.comments.includes(comment)) {
      toast('Please give me new compliments! I have been told this already 😇');
    } else {
      const newPost = { ...this.props.current, comments: [comment].concat(this.props.current.comments) };
      this.props.updatePost(this.props.postID, newPost, this.props.oldHistory, true);
    }
  }

  handleDeleteComment = (commentToDelete) => {
    const newPost = { ...this.props.current, comments: this.props.current.comments.filter((comment) => comment !== commentToDelete) };
    this.props.updatePost(this.props.postID, newPost, this.props.oldHistory, true);
  }

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

  renderComments = (comments) => {
    if (comments) {
      return (comments.map((comment) => (
        <div key={comment} className="comment">
          <i className="fas fa-window-close"
            role="button"
            tabIndex="0"
            aria-label="Delete comment"
            onClick={() => this.handleDeleteComment(comment)}
          />
          <ReactMarkdown>{comment || ''}</ReactMarkdown>
        </div>
      )));
    } else {
      return (null);
    }
  }

  renderParents = (parents) => {
    if (parents) {
      return (parents.map((parent) => (
        <div className="parent" key={parent}>{parent}</div>
      )));
    } else {
      return (null);
    }
  }

  renderPostText = () => {
    if (this.state.isEditing) {
      return (
        <div className="edit-and-preview">
          <div className="edit-post">
            <p>Pet&apos;s name</p>
            <TextareaAutosize
              onChange={(e) => this.onInputChange(e, 'title')}
              value={this.state.post.title}
            />
            <p>Pet&apos;s parent(s) separated by commas</p>
            <TextareaAutosize
              onChange={(e) => this.onInputChange(e, 'parents')}
              value={this.state.post.parents}
              placeholder="ex. &apos;mom, dad&apos;"
            />
            <p>Type of animal</p>
            <TextareaAutosize
              onChange={(e) => this.onInputChange(e, 'tags')}
              value={this.state.post.tags}
              placeholder="ex. &apos;dog&apos;, &apos;cat&apos;, &apos;turtle&apos;, &apos;fish&apos;, &apos;chinchilla&apos;, or other"
            />
            <p>Tell us about your pet and all of their best traits! Now is not the time to hold back 😇</p>
            <TextareaAutosize className="post-content"
              onChange={(e) => this.onInputChange(e, 'content')}
              value={this.state.post.content}
              placeholder="Markdown supported!"
            />
            <p>Image Url</p>
            <TextareaAutosize
              onChange={(e) => this.onInputChange(e, 'coverUrl')}
              value={this.state.post.coverUrl}
              placeholder="After filling out the type of animal (ex. 'dog), try a broken link here"
            />
            <div className="icons">
              <i className="fas fa-save" onClick={this.handleSave} role="button" tabIndex="0" label="Save Post" />
            </div>
          </div>
          <div className="edit-preview">
            <CoverImg srcImg={this.state.post.coverUrl} tags={this.state.post.tags} />
            <div className="name">{this.state.post.title}</div>
            <div className="tags">{this.state.post.tags}</div>
            {this.renderParents(this.state.post.parents.split(','))}
            <div className="content">
              <ReactMarkdown>{this.state.post.content || ''}</ReactMarkdown>
            </div>
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
          padding: '15vh 5vw',
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
            {this.renderParents(this.props.current.parents)}
          </div>

          <div className="preview-right-panel">
            <div id="fan-mail-title">✨ get to know {this.props.current.title}! ✨ </div>
            <div className="content">
              <ReactMarkdown>{this.props.current.content || ''}</ReactMarkdown>
            </div>
            <div className="buttons">
              <input type="button" onClick={this.handleEdit} value="Edit me" />
              <input type="button" onClick={this.openModal} value="Delete me?? You wouldn&apos;t, would you?!" />
            </div>
          </div>

          <div className="comment-section">
            <TextareaAutosize className="new-comment"
              onChange={this.handleCommentEdit}
              value={this.state.newComment}
              placeholder="Markdown supported!"
            />
            <div className="buttons">
              <input type="button" onClick={this.handleNewCommentSave} value="Give me a compliment 😇" />
            </div>
            <div className="existing-comments">
              {this.renderComments(this.props.current.comments)}
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
