'use client'
import { useCache } from '@/store/cache'

export default function SearchBar () {
  const search = useCache(s => s.search)
  const setSearch = useCache(s => s.setSearch)
  return (
    <input
      className='w-full sm:w-96 h-full rounded-lg p-4 md:p-6 bg-[var(--input-bg)] text-[var(--foreground)] shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition hover:bg-[var(--chip-bg)]'
      placeholder='Search for a country...'
      value={search}
      onChange={e => setSearch(e.target.value)}
      aria-label='Search for a country'
    />
  )
}