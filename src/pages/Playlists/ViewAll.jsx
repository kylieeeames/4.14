import axios from 'axios';
import React from 'react'
import { useLoaderData, Link } from 'react-router'
import { Edit, Delete, PlaylistPlay } from '@mui/icons-material';

const ViewAll = () => {
    const playlistData = useLoaderData();
    
    return (
        <div className="main-content">
            <div className="page-header">
                <h1>All Playlists</h1>
                <p>Browse and manage your video playlists</p>
            </div>

            {playlistData.length === 0 ? (
                <div className="error">
                    <h2>No playlists found</h2>
                    <p>Create your first playlist to get started</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {playlistData.map(playlist => (
                        <div key={playlist.id} className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <PlaylistPlay style={{ fontSize: '20px', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                    {playlist.title}
                                </h3>
                            </div>
                            <div className="card-content">
                                <p style={{ textAlign: 'left', color: 'var(--text)', fontSize: '0.875rem' }}>
                                    Playlist ID: <code>{playlist.id}</code>
                                </p>
                            </div>
                            <div className="card-actions">
                                <Link to={`watch/${playlist.id}`} className="action-btn primary" style={{ display: 'inline-flex' }}>
                                    <PlaylistPlay style={{ fontSize: '18px' }} />
                                    Watch
                                </Link>
                                <Link to={playlist.id} className="action-btn" style={{ display: 'inline-flex' }}>
                                    View
                                </Link>
                                <Link to={`edit/${playlist.id}`} className="action-btn" style={{ display: 'inline-flex' }}>
                                    <Edit style={{ fontSize: '18px' }} />
                                </Link>
                                <Link to={`delete/${playlist.id}`} className="action-btn" style={{ display: 'inline-flex', color: 'var(--error)', borderColor: 'var(--error)' }}>
                                    <Delete style={{ fontSize: '18px' }} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewAll

export const loader = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const { data } = await axios.get(API_URL + "/playlists");
    return data
}