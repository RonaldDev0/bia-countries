'use client'
import { useCache } from '@/store/cache'

export default function SearchBar () {
  const search = useCache(s => s.search)
  const setSearch = useCache(s => s.setSearch)
  return (
    <div className='w-full sm:w-96 flex items-center bg-[var(--input-bg)] text-[var(--foreground)] rounded-lg shadow focus-within:ring-2 focus-within:ring-blue-400 transition hover:bg-[var(--chip-bg)] px-4 md:px-6 h-12 md:h-14'>
      <svg className='w-5 h-5 text-gray-400 mr-3 flex-shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' aria-hidden='true'>
        <circle cx='11' cy='11' r='8' stroke='currentColor' strokeWidth='2' />
        <line x1='21' y1='21' x2='16.65' y2='16.65' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
      </svg>
      <input
        className='w-full h-full bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 border-none text-[var(--foreground)] placeholder:text-gray-400'
        placeholder='Search for a country...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label='Search for a country'
      />
    </div>
  )
}