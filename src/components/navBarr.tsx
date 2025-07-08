'use client'
import { useEffect, useState } from 'react'

export default function NavBar () {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement.classList
    if (dark) {
      root.add('dark')
    } else {
      root.remove('dark')
    }
  }, [dark])

  return (
    <nav className='w-full flex justify-between px-28 h-14 items-center bg-slate-700'>
      <h1 className='text-xl font-bold'>Where in the world?</h1>
      <button
        className='flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-300 focus:outline-none'
        onClick={() => setDark(d => !d)}
        aria-label='Toggle dark mode'
      >
        <span className='transition-transform duration-300'>
          {dark ? (
            // Luna SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21 12.79A9 9 0 0 1 11.21 3a1 1 0 0 0-1.13 1.32A7 7 0 1 0 19.68 13.92A1 1 0 0 0 21 12.79Z"/></svg>
          ) : (
            // Sol SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm10 9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm13.66 6.66a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM6.05 6.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 1 1 5.34 3.93l.71.71a1 1 0 0 1 0 1.41Zm12.02-1.41a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM6.05 17.95a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0Z"/></svg>
          )}
        </span>
        <span className='font-semibold text-base'>
          {dark ? 'Dark Theme' : 'Light Theme'}
        </span>
      </button>
    </nav>
  )
}