import React, { useState } from 'react';
import './CodeShare.css';

function CodeShare({ onClose, onCodeShareCreated }) {
  const [codeShare, setCodeShare] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    tags: ''
  });

  const languages = [
    'javascript',
    'python',
    'java',
    'cpp',
    'ruby',
    'php',
    'html',
    'css',
    'sql',
    'typescript',
    'other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCodeShare = {
      id: Date.now(),
      title: codeShare.title,
      description: codeShare.description,
      code: codeShare.code,
      language: codeShare.language,
      tags: codeShare.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: { username: 'Anonymous User' },
      createdAt: new Date(),
      comments: [],
      votes: { up: 0, down: 0 }
    };

    onCodeShareCreated(newCodeShare);
    onClose();
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
    <div className="code-share">
      <h2>Share Code</h2>
      <p className="subtitle">Share your code snippets with the community</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={codeShare.title}
            onChange={(e) => setCodeShare({...codeShare, title: e.target.value})}
            placeholder="What's your code about?"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={codeShare.description}
            onChange={(e) => setCodeShare({...codeShare, description: e.target.value})}
            placeholder="Explain what your code does..."
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Programming Language</label>
          <select
            value={codeShare.language}
            onChange={(e) => setCodeShare({...codeShare, language: e.target.value})}
            required
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Code</label>
          <div className="code-editor">
            <div className="editor-toolbar">
              <button 
                type="button" 
                onClick={() => copyToClipboard(codeShare.code)}
                className="copy-btn"
              >
                Copy Code
              </button>
            </div>
            <textarea
              value={codeShare.code}
              onChange={(e) => setCodeShare({...codeShare, code: e.target.value})}
              placeholder="Paste your code here..."
              className="code-input"
              required
              rows="10"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            value={codeShare.tags}
            onChange={(e) => setCodeShare({...codeShare, tags: e.target.value})}
            placeholder="javascript, react, algorithm"
          />
          <small>Separate tags with commas</small>
        </div>

        <div className="guidelines">
          <h4>Sharing Guidelines:</h4>
          <ul>
            <li>Make sure your code is properly formatted</li>
            <li>Include relevant comments in your code</li>
            <li>Add appropriate tags to help others find your code</li>
            <li>Provide a clear description of what your code does</li>
          </ul>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Share Code
          </button>
        </div>
      </form>
    </div>
  );
}

export default CodeShare; 