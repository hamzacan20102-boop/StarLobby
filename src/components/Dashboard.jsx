import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebase';
import TeamCreation from './TeamCreation';
import JoinTeam from './JoinTeam';
import '../styles/main.css';

export default function Dashboard({ onLogout, isDarkMode, onToggleDarkMode }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'teams'),
      where('members', 'array-contains', user.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const teamsList = [];
      querySnapshot.forEach((doc) => {
        teamsList.push({ id: doc.id, ...doc.data() });
      });
      setTeams(teamsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshKey]);

  const handleTeamCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleLeaveTeam = async (teamId, userEmail) => {
    try {
      const teamRef = doc(db, 'teams', teamId);
      await updateDoc(teamRef, {
        members: arrayRemove(userEmail)
      });
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error('Takımdan çıkılırken hata:', err);
    }
  };

  const handleKickUser = async (teamId, userEmail) => {
    try {
      const teamRef = doc(db, 'teams', teamId);
      await updateDoc(teamRef, {
        members: arrayRemove(userEmail)
      });
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error('Üye atılırken hata:', err);
    }
  };

  return (
    <div className="app" style={{
      backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
      color: isDarkMode ? '#f3f4f6' : '#1f2937'
    }}>
      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="logo">⭐ StarLobby</a>
        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={onToggleDarkMode}
            title="Tema Değiştir"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Çıkış Yap
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Left Ad Space */}
        <div id="ad-left" className="ad-container ad-left">
          <div className="ad-placeholder">Google Ads - Sol Alan<br/><small>728x90 (Dikey)</small></div>
        </div>

        {/* Main Section */}
        <div className="main-section">
          <TeamCreation onTeamCreated={handleTeamCreated} />
          <JoinTeam onTeamJoined={handleTeamCreated} />

          <div className="mt-4">
            <h2 className="mb-2">Katıldığınız Takımlar</h2>
            
            {loading ? (
              <div className="spinner"></div>
            ) : teams.length === 0 ? (
              <div className="card text-center">
                <p className="text-muted">Henüz hiçbir takıma katılmadınız.</p>
              </div>
            ) : (
              teams.map((team) => (
                <div key={team.id} className="team-card">
                  <div className="team-header">
                    <div className="team-name">{team.name}</div>
                    <div className="team-code">Kod: {team.code}</div>
                  </div>

                  <div className="team-info">
                    <div className="team-stat">
                      <div className="team-stat-label">Küpalar</div>
                      <div className="team-stat-value">👑 {team.trophies}</div>
                    </div>
                    <div className="team-stat">
                      <div className="team-stat-label">Üyeler</div>
                      <div className="team-stat-value">👥 {team.members?.length || 0}/{team.maxMembers || 3}</div>
                    </div>
                    <div className="team-stat">
                      <div className="team-stat-label">Durumu</div>
                      <div className="team-stat-value" style={{ fontSize: '0.9rem' }}>✅ Aktif</div>
                    </div>
                  </div>

                  {team.description && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                      <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{team.description}</p>
                    </div>
                  )}

                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {auth.currentUser?.email === team.leader && (
                      <div style={{ flex: 1, minWidth: '150px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}>Üyeleri Yönet:</div>
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                          {team.members?.map((member) => (
                            <button
                              key={member}
                              onClick={() => handleKickUser(team.id, member)}
                              style={{
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.8rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '0.3rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.8)'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                              title="Üyeyi takımdan at"
                            >
                              {member === auth.currentUser?.email ? '❌ Kendim' : `❌ ${member.split('@')[0]}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => handleLeaveTeam(team.id, auth.currentUser?.email)}
                      style={{
                        padding: '0.6rem 1.2rem',
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        marginTop: 'auto',
                        marginLeft: 'auto'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(0,0,0,0.5)';
                        e.target.style.borderColor = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'rgba(0,0,0,0.3)';
                        e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                      }}
                    >
                      🚪 Klandan Çık
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Ad Space */}
        <div id="ad-right" className="ad-container ad-right">
          <div className="ad-placeholder">Google Ads - Sağ Alan<br/><small>728x90 (Dikey)</small></div>
        </div>
      </div>

      {/* Bottom Ad Space */}
      <div id="ad-bottom" style={{
        padding: '2rem',
        textAlign: 'center'
      }} className="bottom-ad">
        <div className="ad-container" style={{ minHeight: '250px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px', width: '100%' }}>
          <div className="ad-placeholder">Google Ads - Alt Alan<br/><small>970x90 veya 728x90</small></div>
        </div>
      </div>
    </div>
  );
}
