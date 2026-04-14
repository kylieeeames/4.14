import { useContext } from "react"
import { VideosContext } from "../../store/VideosContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentVideoIndex } from "../../store/playlist";
import { PlaylistPlay } from "@mui/icons-material";

const VideoPLaylist = () => {
    // const { videos, setCurrentVideoIndex,currentVideoIndex } = useContext(VideosContext);
    const dispatch = useDispatch()
    const videos = useSelector(state => state.playlists.videos)
    const currentVideoIndex = useSelector(state => state.playlists.currentVideoIndex)

    return (
        <div className="playlist-container" style={{ marginTop: '2rem' }}>
            <div className="playlist-header">
                <h3>
                    <PlaylistPlay style={{ fontSize: '20px', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    Playlist ({videos.length} videos)
                </h3>
            </div>
            <div>
                {videos.map((video, index) => (
                    <div
                        key={video.id}
                        onClick={() => dispatch(setCurrentVideoIndex(index))}
                        className={`playlist-item ${index === currentVideoIndex ? 'active' : ''}`}
                    >
                        <span className="playlist-item-number">{index + 1}</span>
                        <p className="playlist-item-text">{video.title}</p>
                        {index === currentVideoIndex && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>
                                ▶
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoPLaylist