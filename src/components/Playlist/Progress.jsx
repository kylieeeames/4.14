import { useContext } from "react";
import { useSelector } from "react-redux";

const Progress = () => {
  const watchPercent = useSelector(state => state.video.watchPercent)

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem'
      }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text)', fontWeight: '500' }}>
          Watched
        </span>
        <span style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: '600' }}>
          {Math.round(watchPercent)}%
        </span>
      </div>
      <progress
        value={Math.round(watchPercent)}
        max={100}
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          border: 'none',
          background: 'var(--code-bg)',
          overflow: 'hidden'
        }}
      />
    </div>
  )
}

export default Progress
