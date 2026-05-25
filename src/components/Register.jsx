import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/main.css';

export default function Register({ onToggleAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Parolalar eşleşmiyor!');
      return;
    }

    if (password.length < 6) {
      setError('Parola en az 6 karakter olmalı!');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Bu e-posta zaten kullanılıyor!');
      } else if (err.code === 'auth/invalid-email') {
        setError('Geçersiz e-posta adresi!');
      } else {
        setError('Kayıt sırasında bir hata oluştu!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Kayıt Ol</h2>
        <p className="auth-subtitle">Brawl Stars Takım Kurma Platformu</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">E-Posta</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Parola</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 6 karakter"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Parola Onayla</label>
            <input
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Parola tekrar girin"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="auth-toggle mt-3">
          Zaten hesabın var mı?{' '}
          <a onClick={onToggleAuth}>Giriş Yap</a>
        </div>
      </div>
    </div>
  );
}
