'use client'
import { useCache } from '@/store/cache'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function Filter () {
  const region = useCache(s => s.region)
  const setRegion = useCache(s => s.setRegion)

  return (
    <div className='relative w-1/2 sm:w-64 flex items-center bg-[var(--input-bg)] text-[var(--foreground)] dark:bg-[var(--input-bg)] dark:text-[var(--foreground)] rounded-lg shadow focus-within:ring-2 focus-within:ring-blue-400 transition h-12 md:h-14'>
      <select
        className='w-full h-full bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 border-none text-[var(--foreground)] dark:text-[var(--foreground)] placeholder:text-gray-400 appearance-none pr-8 px-4 py-3'
        value={region || ''}
        onChange={e => setRegion(e.target.value)}
        aria-label='Filter by region'
      >
        <option value='' className='bg-[var(--input-bg)] text-[var(--foreground)] dark:bg-[var(--input-bg)] dark:text-[var(--foreground)]'>Filter by Region</option>
        {regions.map(region => (
          <option key={region} value={region} className='bg-[var(--input-bg)] text-[var(--foreground)] dark:bg-[var(--input-bg)] dark:text-[var(--foreground)]'>
            {region}
          </option>
        ))}
      </select>
      <span className='absolute right-4 pointer-events-none flex items-center h-full'>
        <svg className='w-4 h-4 text-gray-400 dark:text-gray-300' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' data-testid='dropdown-arrow'>
          <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </span>
    </div>
  )
}