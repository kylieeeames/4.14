import React from 'react';
import { Link } from 'react-router';
import { PlaylistPlay, VideoLibrary, Favorite } from '@mui/icons-material';

const Home = () => {
  return (
    <div className="main-content">
      <div style={{
        textAlign: 'center',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text)',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Organize, watch, and manage your video playlists with ease. Your personal video streaming platform.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Videos Card */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
          <div className="card-header" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            textAlign: 'center',
            padding: '2rem 1.5rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'var(--accent)',
              color: 'white',
              fontSize: '32px',
              marginBottom: '1rem'
            }}>
              <VideoLibrary style={{ fontSize: '32px' }} />
            </div>
            <h3 className="card-title" style={{ textAlign: 'center' }}>Videos</h3>
          </div>
          <div className="card-content" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text)', margin: '0 0 1rem 0' }}>
              Browse and manage all your video content in one place
            </p>
          </div>
          <div className="card-actions" style={{ justifyContent: 'center' }}>
            <Link to="/video" className="action-btn primary" style={{
              display: 'inline-flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              View Videos
            </Link>
          </div>
        </div>

        {/* Playlists Card */}
        <div className="card" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
          <div className="card-header" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            textAlign: 'center',
            padding: '2rem 1.5rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'var(--success)',
              color: 'white',
              fontSize: '32px',
              marginBottom: '1rem'
            }}>
              <PlaylistPlay style={{ fontSize: '32px' }} />
            </div>
            <h3 className="card-title" style={{ textAlign: 'center' }}>Playlists</h3>
          </div>
          <div className="card-content" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text)', margin: '0 0 1rem 0' }}>
              Organize videos into custom playlists and watch them in sequence
            </p>
          </div>
          <div className="card-actions" style={{ justifyContent: 'center' }}>
            <Link to="/playlist" className="action-btn primary" style={{
              display: 'inline-flex',
              gap: '0.5rem',
              alignItems: 'center',
              background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
              color: 'white',
              border: 'none'
            }}>
              View Playlists
            </Link>
          </div>
        </div>

        {/* Features Card */}
        <div className="card">
          <div className="card-header" style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
            textAlign: 'center',
            padding: '2rem 1.5rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: '#a855f7',
              color: 'white',
              fontSize: '32px',
              marginBottom: '1rem'
            }}>
              <Favorite style={{ fontSize: '32px' }} />
            </div>
            <h3 className="card-title" style={{ textAlign: 'center' }}>Features</h3>
          </div>
          <div className="card-content" style={{ textAlign: 'center' }}>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              textAlign: 'left',
              color: 'var(--text)',
              margin: '0'
            }}>
              <li style={{ padding: '0.5rem 0' }}>✨ Easy video management</li>
              <li style={{ padding: '0.5rem 0' }}>📋 Organize into playlists</li>
              <li style={{ padding: '0.5rem 0' }}>▶️ Watch progress tracking</li>
              <li style={{ padding: '0.5rem 0' }}>🔄 Auto-play functionality</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, var(--accent-light) 0%, rgba(59, 130, 246, 0.05) 100%)',
        border: '2px solid var(--accent-border)',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--text-h)', marginTop: '0' }}>Ready to get started?</h2>
        <p style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>
          Start by browsing your videos or watching a playlist
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/video" className="action-btn primary" style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem'
          }}>
            Browse Videos
          </Link>
          <Link to="/playlist" className="action-btn" style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            borderColor: 'var(--accent)',
            color: 'var(--accent)'
          }}>
            View Playlists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
