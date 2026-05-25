import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import '../styles/main.css';

export default function TeamCreation({ onTeamCreated }) {
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [trophies, setTrophies] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTeamCode = () => {
    const code = 'TEAM' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setTeamCode(code);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!teamName.trim()) {
      setError('Takım adı gerekli!');
      return;
    }

    if (!teamCode.trim()) {
      setError('Takım kodu gerekli!');
      return;
    }

    if (!trophies || trophies < 0) {
      setError('Geçerli bir küpa sayısı girin!');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Lütfen giriş yapın!');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'teams'), {
        name: teamName,
        code: teamCode,
        trophies: parseInt(trophies),
        description: description,
        leader: user.email,
        createdAt: new Date(),
        members: [user.email],
        maxMembers: 3
      });

      setSuccess('Takım başarıyla oluşturuldu!');
      setTeamName('');
      setTeamCode('');
      setTrophies('');
      setDescription('');

      if (onTeamCreated) {
        onTeamCreated();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Takım oluşturulurken bir hata oluştu!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="mb-2">Yeni Takım Oluştur</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleCreateTeam}>
        <div className="form-group">
          <label className="form-label">Takım Adı</label>
          <input
            type="text"
            className="form-input"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Takımınıza bir ad verin"
            disabled={loading}
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Takım Kodu</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              className="form-input"
              value={teamCode}
              readOnly
              placeholder="Kod Oyundan Alınız!"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={generateTeamCode}
              disabled={loading}
            >
              Oluştur
            </button>
          </div>
          <small className="text-muted">
            Takım arkadaşlarınız bu kodu kullanarak takıma katılabilir
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">Takım Küpaları</label>
          <input
            type="number"
            className="form-input"
            value={trophies}
            onChange={(e) => setTrophies(e.target.value)}
            placeholder="0"
            min="0"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Takım Açıklaması</label>
          <textarea
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Takımınız hakkında bilgi verin"
            rows="3"
            disabled={loading}
            maxLength="200"
            style={{ resize: 'vertical' }}
          ></textarea>
          <small className="text-muted">{description.length}/200</small>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? 'Oluşturuluyor...' : 'Takımı Oluştur'}
        </button>
      </form>
    </div>
  );
}
