import React, { useState } from 'react';
import '../App.css';

function CreateDiscussion({ onClose, onDiscussionCreated }) {
  const [discussion, setDiscussion] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDiscussion = {
      id: Date.now(), 
      title: discussion.title,
      content: discussion.content,
      tags: discussion.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: { username: 'Anonymous User' }, 
      createdAt: new Date(),
      comments: [],
      votes: { up: 0, down: 0 }
    };

    onDiscussionCreated(newDiscussion);
    onClose();
  };

  return (
    <div className="create-discussion">
      <h2>Start a Discussion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={discussion.title}
            onChange={(e) => setDiscussion({...discussion, title: e.target.value})}
            placeholder="What's on your mind?"
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={discussion.content}
            onChange={(e) => setDiscussion({...discussion, content: e.target.value})}
            placeholder="Share your thoughts..."
            required
            rows="6"
          />
        </div>

        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={discussion.tags}
            onChange={(e) => setDiscussion({...discussion, tags: e.target.value})}
            placeholder="react, javascript, webdev"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Post Discussion
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDiscussion; 