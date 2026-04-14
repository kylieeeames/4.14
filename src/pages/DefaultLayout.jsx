import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../components/Layout/Navbar'

export const DefaultLayout = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--bg)'
    }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text)',
        fontSize: '0.875rem',
        marginTop: '3rem'
      }}>
        <p style={{ margin: '0' }}>
          © 2024 IS 3750. Made with ❤️ for student in IS 3750.
        </p>
      </footer>
    </div>
  )
}
