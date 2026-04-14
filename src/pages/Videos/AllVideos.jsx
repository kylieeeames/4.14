import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import axios from 'axios';
import React from 'react'
import { Link, useLoaderData } from 'react-router'

const AllVideos = () => {
    const videos = useLoaderData();
    
    return (
        <div className="main-content">
            <div className="page-header">
                <h1>All Videos</h1>
                <p>Manage and view all your videos</p>
            </div>

            {videos.length === 0 ? (
                <div className="error">
                    <h2>No videos found</h2>
                    <p>Start by creating a new video</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {videos.map(vid => (
                        <div key={vid.id} className="card">
                            <div className="card-header">
                                <h3 className="card-title">{vid.title}</h3>
                            </div>
                            <div className="card-content">
                                <p style={{ textAlign: 'left', color: 'var(--text)', fontSize: '0.875rem' }}>
                                    Video ID: <code>{vid.id}</code>
                                </p>
                            </div>
                            <div className="card-actions">
                                <Link to={vid.id} className="action-btn primary" style={{ display: 'inline-flex' }}>
                                    <PlayArrow style={{ fontSize: '18px' }} />
                                    View
                                </Link>
                                <Link to={`edit/${vid.id}`} className="action-btn" style={{ display: 'inline-flex' }}>
                                    <Edit style={{ fontSize: '18px' }} />
                                </Link>
                                <Link to={`delete/${vid.id}`} className="action-btn" style={{ display: 'inline-flex', color: 'var(--error)', borderColor: 'var(--error)' }}>
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

export default AllVideos

export const loader = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const { data } = await axios.get(API_URL + "/videos");
    return data;
}
