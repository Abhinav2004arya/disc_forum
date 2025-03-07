import React, { useState } from 'react';
import '../App.css';

function DiscussionDetail({ discussion, onClose, onVote, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [votes, setVotes] = useState({
    discussion: { up: discussion.votes?.up || 0, down: discussion.votes?.down || 0 },
    comments: {}
  });

  const handleVote = (type, id, isComment = false) => {
    if (isComment) {
      setVotes(prev => ({
        ...prev,
        comments: {
          ...prev.comments,
          [id]: {
            ...prev.comments[id],
            [type]: (prev.comments[id]?.[type] || 0) + 1
          }
        }
      }));
    } else {
      setVotes(prev => ({
        ...prev,
        discussion: {
          ...prev.discussion,
          [type]: prev.discussion[type] + 1
        }
      }));
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = {
      id: Date.now(),
      content: newComment,
      author: { username: 'Anonymous User' },
      createdAt: new Date(),
      replyTo: replyingTo,
      votes: { up: 0, down: 0 }
    };
    
    onAddComment(discussion.id, comment);
    setNewComment('');
    setReplyingTo(null);
  };

  const handleReply = (commentId, authorName) => {
    setReplyingTo(commentId);
    setNewComment(`@${authorName} `);
    // Scroll to comment form
    document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
      alert('Failed to copy code to clipboard');
    }
  };

  return (
    <div className="discussion-detail">
      <div className="discussion-header">
        <div className="header-main">
          <h2>{discussion.title}</h2>
          <div className="header-actions">
            <button className="bookmark-btn">
              <span>🔖</span>
            </button>
            <button className="share-btn">
              <span>🔗</span>
            </button>
            <button className="more-btn">
              <span>⋮</span>
            </button>
          </div>
        </div>
        <div className="post-meta">
          <div className="author-info">
            <span className="author-avatar">{discussion.author.username.charAt(0)}</span>
            <span className="author-name">{discussion.author.username}</span>
          </div>
          <span className="post-date">{new Date(discussion.createdAt).toLocaleDateString()}</span>
          <span className="reply-count">{discussion.comments.length} replies</span>
          <span className="view-count">{discussion.views || 0} views</span>
        </div>
      </div>

      <div className="discussion-content">
        <div className="vote-buttons">
          <button 
            onClick={() => handleVote('up', discussion.id)} 
            className="vote-btn upvote"
          >
            👍 {votes.discussion.up}
          </button>
          <button 
            onClick={() => handleVote('down', discussion.id)} 
            className="vote-btn downvote"
          >
            👎 {votes.discussion.down}
          </button>
        </div>
        <div className="content-text">
          <p>{discussion.content}</p>
          <div className="content-tags">
            {discussion.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Code display section */}
        {discussion.code && (
          <div className="code-preview">
            <div className="code-header">
              <span className="language-tag">{discussion.language}</span>
              <button 
                className="copy-btn" 
                onClick={() => copyToClipboard(discussion.code)}
              >
                Copy
              </button>
            </div>
            <pre className="code-block">
              <code>{discussion.code}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="comments-section">
        <h3>Comments ({discussion.comments.length})</h3>
        
        {discussion.comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <div className="commenter-info">
                <span className="commenter-avatar">{comment.author.username.charAt(0)}</span>
                <div className="commenter-details">
                  <span className="commenter-name">{comment.author.username}</span>
                  {comment.badges && comment.badges.map(badge => (
                    <span key={badge} className="badge">{badge}</span>
                  ))}
                </div>
              </div>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="comment-content">
              {comment.content}
            </div>
            <div className="comment-actions">
              <button 
                onClick={() => handleVote('up', comment.id, true)} 
                className="vote-btn"
              >
                👍 {votes.comments[comment.id]?.up || 0}
              </button>
              <button 
                onClick={() => handleVote('down', comment.id, true)} 
                className="vote-btn"
              >
                👎 {votes.comments[comment.id]?.down || 0}
              </button>
              <button 
                onClick={() => handleReply(comment.id, comment.author.username)} 
                className="reply-btn"
              >
                Reply
              </button>
            </div>
          </div>
        ))}

        <form onSubmit={handleAddComment} className="comment-form">
          {replyingTo && (
            <div className="replying-to">
              Replying to comment
              <button 
                onClick={() => {
                  setReplyingTo(null);
                  setNewComment('');
                }}
                className="cancel-reply"
              >
                Cancel
              </button>
            </div>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your reply..."
            required
          />
          <button type="submit" className="submit-btn">
            {replyingTo ? 'Post Reply' : 'Add Comment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiscussionDetail; 