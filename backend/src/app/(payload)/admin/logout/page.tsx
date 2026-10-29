'use client'

import { useEffect } from 'react'
import { useAuth } from '@payloadcms/ui'

export default function LogoutPage() {
  const { logOut } = useAuth()

  useEffect(() => {
    let mounted = true

    const performLogout = async () => {
      try {
        await logOut()
      } catch (error) {
        console.error('[LogoutPage] Logout error:', error)
      } finally {
        if (mounted) {
          window.location.href = '/admin/login'
        }
      }
    }

    performLogout()

    return () => {
      mounted = false
    }
  }, [logOut])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <p>Logging out...</p>
      <a href="/admin/login" style={{ display: 'none' }}>Return to Login</a>
    </div>
  )
}

