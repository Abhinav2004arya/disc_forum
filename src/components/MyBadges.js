import React from 'react';
import './MyBadges.css';

function MyBadges() {
  const badges = [
    {
      id: 1,
      name: "Code Master",
      icon: "🏆",
      description: "Achieved 100+ successful code submissions",
      earnedDate: "2024-02-15",
      level: "gold",
      progress: 100
    },
    {
      id: 2,
      name: "Problem Solver",
      icon: "💡",
      description: "Helped resolve 50+ community questions",
      earnedDate: "2024-02-10",
      level: "silver",
      progress: 75
    },
    {
      id: 3,
      name: "Team Player",
      icon: "🤝",
      description: "Collaborated on 25+ discussions",
      earnedDate: "2024-02-05",
      level: "bronze",
      progress: 60
    },
    {
      id: 4,
      name: "Bug Hunter",
      icon: "🐛",
      description: "Found and fixed 30+ bugs",
      earnedDate: null,
      level: "locked",
      progress: 40
    },
    {
      id: 5,
      name: "Code Reviewer",
      icon: "👀",
      description: "Reviewed 20+ code submissions",
      earnedDate: null,
      level: "locked",
      progress: 25
    }
  ];

  return (
    <div className="my-badges">
      <div className="badges-header">
        <h2>My Badges</h2>
        <p className="subtitle">Track your achievements and progress</p>
      </div>

      <div className="badges-stats">
        <div className="stat-card">
          <span className="stat-number">3</span>
          <span className="stat-label">Badges Earned</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">2</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">Gold</span>
          <span className="stat-label">Highest Rank</span>
        </div>
      </div>

      <div className="badges-container">
        {badges.map(badge => (
          <div key={badge.id} className={`badge-card ${badge.level}`}>
            <div className="badge-icon">{badge.icon}</div>
            <div className="badge-info">
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${badge.progress}%` }}
                ></div>
              </div>
              <div className="badge-meta">
                {badge.earnedDate ? (
                  <span className="earned-date">
                    Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="progress-text">
                    {badge.progress}% Complete
                  </span>
                )}
                <span className={`badge-level ${badge.level}`}>
                  {badge.level.charAt(0).toUpperCase() + badge.level.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="badges-info">
        <h3>How to Earn Badges</h3>
        <div className="info-cards">
          <div className="info-card">
            <span className="info-icon">📝</span>
            <h4>Share Code</h4>
            <p>Submit and share your code solutions with the community</p>
          </div>
          <div className="info-card">
            <span className="info-icon">💬</span>
            <h4>Participate</h4>
            <p>Engage in discussions and help other developers</p>
          </div>
          <div className="info-card">
            <span className="info-icon">⭐</span>
            <h4>Get Recognized</h4>
            <p>Receive upvotes and appreciation from peers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBadges; 