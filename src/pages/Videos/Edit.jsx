import { Save } from '@mui/icons-material';
import axios from 'axios'
import { Form, redirect, useActionData, useLoaderData, Await } from 'react-router'
import { isValidUrl } from '../../utils/checkUrls';
import { Suspense } from 'react';

const EditVideo = () => {
  const { data: video, playlists } = useLoaderData();
  const errors = useActionData();

  return (
    <div className="main-content" style={{ maxWidth: '600px' }}>
      <div className="page-header">
        <h1>Edit Video</h1>
        <p>Update your video information</p>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)', border: '1px solid var(--border)' }}>
        <Form method='post'>
          <div className="form-group">
            <label htmlFor="title">Video Title</label>
            <input
              type="text"
              id="title"
              defaultValue={video.title}
              name="title"
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">YouTube URL</label>
            <input
              type="url"
              id="url"
              defaultValue={video.youtubeUrl}
              name="url"
              placeholder="https://www.youtube.com/embed/..."
              required
            />
            {errors && (
              <div style={{ marginTop: '0.5rem', color: 'var(--error)', fontSize: '0.875rem' }}>
                {errors.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="playlist">Playlist</label>
            <select id="playlist" name='playlist' required>
              <Suspense fallback={<option>Loading playlists...</option>}>
                <Await resolve={playlists}>
                  {(awaitedPlaylists) => (
                    <>
                      <option value="">-- Select a playlist --</option>
                      {awaitedPlaylists.map(playlist => (
                        <option key={playlist.id} value={playlist.id}>
                          {playlist.title}
                        </option>
                      ))}
                    </>
                  )}
                </Await>
              </Suspense>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type='submit' className="primary" style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
              <Save style={{ fontSize: '20px' }} />
              Save Changes
            </button>
            <a href="/video" className="action-btn" style={{ borderColor: 'var(--text)' }}>
              Cancel
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EditVideo

const wait = (ms) => new Promise(res => setTimeout(res, ms));

const getData = async () => {
  await wait(5000);
  const { data } = await axios.get("http://localhost:3000/playlists");
  return data;
}

export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`http://localhost:3000/videos/${id}`);
  const playlists = getData();
  return { data, playlists }
}

export const action = async ({ params, request }) => {
  const { id } = params;
  const submittedForm = await request.formData();
  const title = submittedForm.get("title");
  const youtubeUrl = submittedForm.get("url");
  const playlistId = submittedForm.get("playlist")

  if (isValidUrl(youtubeUrl)) {
    try {
      await axios.put(API_URL + "/videos/" + id, { id, title, youtubeUrl, playlistId })
      return redirect("/video");
    } catch (e) {
      return { code: 500, message: e }
    }
  }

  return { code: 400, message: "URL is invalid please ensure it is a valid embed link" };
}