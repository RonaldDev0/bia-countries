'use client'
import { useCache } from '@/store/cache'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function Filter () {
  const region = useCache(s => s.region)
  const setRegion = useCache(s => s.setRegion)

  return (
    <select
      className='bg-slate-800 p-3 h-full rounded-lg'
      value={region || ''}
      onChange={e => setRegion(e.target.value)}
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