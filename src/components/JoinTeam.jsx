import React, { useState } from 'react';
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase';
import '../styles/main.css';

export default function JoinTeam({ onTeamJoined }) {
  const [teamCode, setTeamCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundTeam, setFoundTeam] = useState(null);

  const handleSearchTeam = async () => {
    setError('');
    setSuccess('');
    setFoundTeam(null);

    if (!teamCode.trim()) {
      setError('Takım kodunu girin!');
      return;
    }

    setLoading(true);

    try {
      const q = query(
        collection(db, 'teams'),
        where('code', '==', teamCode.toUpperCase())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Bu takım kodu bulunamadı!');
      } else {
        const teamDoc = querySnapshot.docs[0];
        setFoundTeam({ id: teamDoc.id, ...teamDoc.data() });
      }
    } catch (err) {
      setError('Arama sırasında bir hata oluştu!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!foundTeam) return;

    const user = auth.currentUser;
    if (!user) {
      setError('Lütfen giriş yapın!');
      return;
    }

    if (foundTeam.members?.includes(user.email)) {
      setError('Zaten bu takımın üyesisiniz!');
      return;
    }

    if (foundTeam.members?.length >= foundTeam.maxMembers) {
      setError('Takım dolu! Yeni üye kabul edilemiyor.');
      return;
    }

    setLoading(true);

    try {
      const teamRef = collection(db, 'teams');
      const docRef = query(teamRef, where('code', '==', teamCode.toUpperCase()));
      const querySnapshot = await getDocs(docRef);

      if (!querySnapshot.empty) {
        const teamDocRef = querySnapshot.docs[0].ref;
        await updateDoc(teamDocRef, {
          members: arrayUnion(user.email)
        });

        setSuccess('Takıma başarıyla katıldınız!');
        setTeamCode('');
        setFoundTeam(null);

        if (onTeamJoined) {
          setTimeout(() => onTeamJoined(), 1000);
        }
      }
    } catch (err) {
      setError('Takıma katılırken bir hata oluştu!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-3">
      <h2 className="mb-2">Takıma Katıl</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="form-group">
        <label className="form-label">Takım Kodunu Girin</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
            placeholder="örn: TEAM3KH2"
            disabled={loading}
            maxLength="10"
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-secondary"
            onClick={handleSearchTeam}
            disabled={loading}
          >
            Ara
          </button>
        </div>
      </div>

      {foundTeam && (
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#3b82f6' }}>
            ✓ {foundTeam.name}
          </h3>
          <p style={{ marginBottom: '0.25rem' }}>
            <strong>Küpalar:</strong> 👑 {foundTeam.trophies}
          </p>
          <p style={{ marginBottom: '0.25rem' }}>
            <strong>Üyeler:</strong> 👥 {foundTeam.members?.length}/{foundTeam.maxMembers}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Lider:</strong> {foundTeam.leader}
          </p>
          {foundTeam.description && (
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
              {foundTeam.description}
            </p>
          )}

          <button
            className="btn btn-success btn-block"
            onClick={handleJoinTeam}
            disabled={loading}
          >
            {loading ? 'Katılınıyor...' : 'Takıma Katıl'}
          </button>
        </div>
      )}
    </div>
  );
}
