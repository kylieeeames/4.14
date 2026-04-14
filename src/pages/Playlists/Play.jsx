import VideoPlaylist from "../../components/Playlist/VideoPlaylist";
import VideoPlayer from "../../components/Playlist/VideoPlayer";
import Progress from "../../components/Playlist/Progress";
import { useSelector } from "react-redux";

const Play = () => {
  const loading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.error);
  const playlist = useSelector(state=>state.playlists.videos);
  const currentVideoId = useSelector(state=>state.playlists.currentVideoId);
  const currentVideo = playlist[currentVideoId]
  return (
    <>
      {!loading && !error && (
        <div className="main-content">
          <div className="page-header">
            <h1>{currentVideo?.title || 'Now Playing'}</h1>
            <p>Enjoy your video</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 350px',
            gap: '2rem',
            alignItems: 'start'
          }}>
            <div>
              <VideoPlayer />
              <Progress />
            </div>
            <VideoPlaylist />
          </div>
        </div>
      )}
      {loading && (
        <div className="loading">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)',
              color: 'white',
              marginBottom: '1rem',
              animation: 'spin 1s linear infinite'
            }}>
              ▶
            </div>
            <p>Loading your playlist...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="main-content">
          <div className="error">
            <h2>⚠️ Error Loading Playlist</h2>
            <p>{error.message}</p>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default Play;
