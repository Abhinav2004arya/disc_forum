import React, { useState } from 'react';
import './AskMentor.css';

function AskMentor({ onClose, onQuestionSubmitted }) {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    tags: '',
    urgency: 'normal'
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

  const urgencyLevels = [
    { value: 'low', label: 'Low - General guidance needed' },
    { value: 'normal', label: 'Normal - Stuck on a problem' },
    { value: 'high', label: 'High - Blocking issue' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newQuestion = {
      id: Date.now(),
      ...question,
      tags: question.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: { username: 'Anonymous User' },
      createdAt: new Date(),
      status: 'open',
      responses: []
    };

    onQuestionSubmitted(newQuestion);
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
    <div className="ask-mentor">
      <h2>Ask a Mentor</h2>
      <p className="subtitle">Get help from experienced developers in the community</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Title</label>
          <input
            type="text"
            value={question.title}
            onChange={(e) => setQuestion({...question, title: e.target.value})}
            placeholder="What do you need help with?"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={question.description}
            onChange={(e) => setQuestion({...question, description: e.target.value})}
            placeholder="Explain your problem in detail..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Programming Language</label>
          <select
            value={question.language}
            onChange={(e) => setQuestion({...question, language: e.target.value})}
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
          <label>Code (if applicable)</label>
          <div className="code-editor">
            <div className="editor-toolbar">
              <button 
                type="button" 
                onClick={() => copyToClipboard(question.code)}
                className="copy-btn"
              >
                Copy Code
              </button>
            </div>
            <textarea
              value={question.code}
              onChange={(e) => setQuestion({...question, code: e.target.value})}
              placeholder="Share your code here..."
              className="code-input"
              rows="10"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <select
            value={question.urgency}
            onChange={(e) => setQuestion({...question, urgency: e.target.value})}
            required
          >
            {urgencyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            value={question.tags}
            onChange={(e) => setQuestion({...question, tags: e.target.value})}
            placeholder="javascript, react, debugging"
          />
          <small>Separate tags with commas</small>
        </div>

        <div className="guidelines">
          <h4>Asking Guidelines:</h4>
          <ul>
            <li>Be specific about your problem</li>
            <li>Share relevant code snippets</li>
            <li>Explain what you've tried so far</li>
            <li>Use appropriate tags to reach the right mentors</li>
          </ul>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
}

export default AskMentor; 