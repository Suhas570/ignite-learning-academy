'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'
import { LogOutIcon } from '@payloadcms/ui/icons/LogOut'

export const LogoutButton: React.FC = () => {
  const { logOut } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.error('[LogoutButton] Logout failed:', error)
    } finally {
      window.location.href = '/admin/login'
    }
  }

  return (
    <button
      aria-label="Log out"
      className="nav__log-out"
      onClick={handleLogout}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
      }}
      title="Log out"
      type="button"
    >
      <LogOutIcon />
    </button>
  )
}

