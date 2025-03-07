import React, { useState } from 'react';
import '../App.css';

function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('This Month');

  const topContributors = [
    {
      rank: 1,
      name: "Sarah Chen",
      points: 12500,
      avatar: "/path/to/sarah.jpg"
    },
    {
      rank: 2,
      name: "Alex Kumar",
      points: 11200,
      avatar: "/path/to/alex.jpg"
    },
    {
      rank: 3,
      name: "Maria Garcia",
      points: 10800,
      avatar: "/path/to/maria.jpg"
    },
    {
      rank: 4,
      name: "David Park",
      points: 9900,
      avatar: "/path/to/david.jpg"
    },
    {
      rank: 5,
      name: "Emma Wilson",
      points: 9500,
      avatar: "/path/to/emma.jpg"
    }
  ];

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <div className="title">
          <span className="trophy-icon">🏆</span>
          <h2>Top Contributors</h2>
        </div>
        <select 
          value={timeFilter} 
          onChange={(e) => setTimeFilter(e.target.value)}
          className="time-filter"
        >
          <option>This Month</option>
          <option>This Week</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="contributors-list">
        {topContributors.map((contributor) => (
          <div key={contributor.rank} className="contributor-row">
            <div className="rank">
              <span className={`rank-number rank-${contributor.rank}`}>
                {contributor.rank}
              </span>
            </div>
            <div className="contributor-profile">
              <img 
                src={contributor.avatar} 
                alt={contributor.name}
                className="avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${contributor.name}&background=random`;
                }}
              />
              <div className="contributor-details">
                <span className="name">{contributor.name}</span>
                <span className="points">{contributor.points.toLocaleString()} points</span>
              </div>
            </div>
            <button className="award-badge">
              🏅
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard; 