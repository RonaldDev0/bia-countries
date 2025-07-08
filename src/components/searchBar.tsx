'use client'
import { useCache } from '@/store/cache'

export default function SearchBar () {
  const search = useCache(s => s.search)
  const setSearch = useCache(s => s.setSearch)
  return (
    <input
      className='bg-slate-800 w-96 h-full rounded-lg p-6'
      placeholder='Search for a country...'
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
}