'use client'
import { useCache } from '@/store/cache'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function Filter () {
  const region = useCache(s => s.region)
  const setRegion = useCache(s => s.setRegion)

  return (
    <select
      className='p-3 h-full rounded-lg bg-[var(--input-bg)] text-[var(--foreground)] shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition hover:bg-[var(--chip-bg)]'
      value={region || ''}
      onChange={e => setRegion(e.target.value)}
      aria-label='Filter by region'
    >
      <option value=''>Filter by Region</option>
      {regions.map(region => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  )
}