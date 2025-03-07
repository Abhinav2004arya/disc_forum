import { useState, useEffect } from 'react';
import CreateDiscussion from './components/CreateDiscussion';
import Login from './components/Login';
import Profile from './components/Profile';
import axios from 'axios';
import DiscussionDetail from './components/DiscussionDetail';
import Signup from './components/Signup';
import Leaderboard from './components/Leaderboard';
import CodeShare from './components/CodeShare';
import AskMentor from './components/AskMentor';
import MyBadges from './components/MyBadges';
import './App.css';

function App() {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('discussions'); 
  const [showCodeShare, setShowCodeShare] = useState(false);
  const [showAskMentor, setShowAskMentor] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCreateDiscussion = (newDiscussion) => {
    setDiscussions([newDiscussion, ...discussions]);
    setShowCreateForm(false);
  };

  const handleDiscussionCreated = (newDiscussion) => {
    setDiscussions([newDiscussion, ...discussions]);
    setShowCreateForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleVote = (discussionId, voteType) => {
    setDiscussions(discussions.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          votes: {
            ...disc.votes,
            [voteType]: disc.votes[voteType] + 1
          }
        };
      }
      return disc;
    }));
  };

  const handleAddComment = (discussionId, newComment) => {
    setDiscussions(discussions.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: [...disc.comments, newComment]
        };
      }
      return disc;
    }));
  };

  const handleAllDiscussionsClick = () => {
    setCurrentView('discussions');
    setSelectedDiscussion(null);
    setShowCreateForm(false);
  };

  const handleCodeShareCreated = (newCodeShare) => {
    setDiscussions([newCodeShare, ...discussions]);
    setShowCodeShare(false);
  };

  const handleQuestionSubmitted = (newQuestion) => {
    setShowAskMentor(false);
  };

  return (
    <div className="App">
      <nav className="top-nav">
        <div className="nav-left">
          <h1 className="logo">Coding Ninjas</h1>
          <input 
            type="search" 
            placeholder="AI-Powered Search" 
            className="search-bar"
          />
        </div>
        <div className="nav-right">
          {user ? (
            <Profile user={user} onLogout={handleLogout} />
          ) : (
            <>
              <button className="auth-button" onClick={() => setShowLogin(true)}>Log In</button>
              <button className="auth-button" onClick={() => setShowSignup(true)}>Sign Up</button>
            </>
          )}
        </div>
      </nav>
      
      <div className="sub-nav">
        <div className="nav-items">
          <a 
            href="#" 
            className={`nav-item ${currentView === 'leaderboard' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('leaderboard');
            }}
          >
            <span className="icon">🏆</span> Leaderboard
            <span className="badge">Top 10</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${currentView === 'my-badges' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('my-badges');
            }}
          >
            <span className="icon">🎖️</span> My Badges
            <span className="badge green">3 New</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${currentView === 'ask-mentor' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('ask-mentor');
            }}
          >
            <span className="icon">💡</span> Ask a Mentor
          </a>
          <a 
            href="#" 
            className={`nav-item ${currentView === 'code-share' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('code-share');
            }}
          >
            <span className="icon">💻</span> Code Share
          </a>
        </div>
        <div className="nav-right">
          <span className="status">Auto-Mod Active</span>
          <span className="ai-assistant">AI Assistant</span>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <button 
            className="start-discussion"
            onClick={() => setShowCreateForm(true)}
          >
            Start a Discussion
          </button>
          <nav className="side-nav">
            <button 
              className={`nav-item ${currentView === 'discussions' && !selectedDiscussion ? 'active' : ''}`}
              onClick={handleAllDiscussionsClick}
            >
              <span>📝</span> All Discussions
            </button>
            <button 
              className={`nav-item ${currentView === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('leaderboard')}
            >
              <span>🏆</span> Leaderboard
            </button>
            <button 
              className="nav-item"
              onClick={() => setCurrentView('code-share')}
            >
              <span>💻</span> Code Share
            </button>
            <a href="#" className="nav-item">Tags</a>
            <a href="#" className="nav-item">Test Posting</a>
            <a href="#" className="nav-item">Support</a>
            <a href="#" className="nav-item">Feedback</a>
            <a href="#" className="nav-item">Extensions</a>
            <a href="#" className="nav-item">Dev</a>
            <a href="#" className="nav-item">Meta</a>
            <a href="#" className="nav-item">Resources</a>
          </nav>
        </div>

        {showCreateForm ? (
          <CreateDiscussion
            onClose={() => setShowCreateForm(false)}
            onDiscussionCreated={handleDiscussionCreated}
          />
        ) : currentView === 'code-share' ? (
          <CodeShare
            onClose={() => setCurrentView('discussions')}
            onCodeShareCreated={handleCodeShareCreated}
          />
        ) : currentView === 'leaderboard' ? (
          <Leaderboard />
        ) : currentView === 'ask-mentor' ? (
          <AskMentor
            onClose={() => setCurrentView('discussions')}
            onQuestionSubmitted={handleQuestionSubmitted}
          />
        ) : currentView === 'my-badges' ? (
          <MyBadges />
        ) : selectedDiscussion ? (
          <DiscussionDetail
            discussion={discussions.find(d => d.id === selectedDiscussion)}
            onClose={() => setSelectedDiscussion(null)}
            onVote={handleVote}
            onAddComment={handleAddComment}
          />
        ) : (
          <div className="discussion-list">
            <div className="list-header">
              <button className="active">Latest</button>
              <button className="menu-toggle">≡</button>
            </div>
            
            <div className="discussions">
              {discussions.map((discussion, index) => (
                <div 
                  key={index} 
                  className="discussion-card"
                  onClick={() => setSelectedDiscussion(discussion.id)}
                >
                  <h3>{discussion.title}</h3>
                  <div className="discussion-meta">
                    <span>By {discussion.author.username}</span>
                    <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{discussion.description}</p>
                  
                  {discussion.code && (
                    <div className="code-preview">
                      <div className="code-header">
                        <span className="language-tag">{discussion.language}</span>
                        <button 
                          className="copy-btn" 
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              await navigator.clipboard.writeText(discussion.code);
                              alert('Code copied to clipboard!');
                            } catch (err) {
                              console.error('Failed to copy code:', err);
                              alert('Failed to copy code to clipboard');
                            }
                          }}
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="code-block">
                        <code>{discussion.code}</code>
                      </pre>
                    </div>
                  )}

                  {discussion.codeImages && discussion.codeImages.length > 0 && (
                    <div className="code-images-preview">
                      {discussion.codeImages.map((image, index) => (
                        <div key={index} className="preview-image">
                          <img src={image.preview} alt={`Code screenshot ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="discussion-tags">
                    {discussion.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              {discussions.length === 0 && (
                <div className="no-discussions">
                  <p>No discussions yet. Be the first to start one!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
