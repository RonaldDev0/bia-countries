import Link from 'next/link'
import Image from 'next/image'

import type { CountryBasic } from '@/store/cache'

export default function Card ({ country, priority }: { country: CountryBasic, priority?: boolean }) {
  return (
   <Link href={`/detail?country=${country.name.official}`} className='focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg block transition h-full'>
      <div
        className='flex flex-col justify-between h-full rounded-2xl border border-amber-300 shadow-2xl dark:border-none dark:shadow-none bg-[var(--element-bg)] transition hover:scale-[1.02] hover:shadow-lg'
      >
        <Image
          src={country.flags.svg}
          alt={country.name.official}
          width={270}
          height={180}
          className='rounded-t-lg w-full object-cover'
          style={{ height: 'auto', aspectRatio: '3/2' }}
          priority={priority}
        />
        <div className='p-4 pb-10 flex flex-col h-full text-[14px]'>
          <p className='mb-4 font-semibold text-base'>{country.name.common}</p>
          <div className='flex flex-col gap-1 flex-1'>
            <p className='font-normal'>Population: {country.population.toLocaleString()}</p>
            <p className='font-normal'>Region: {country.region}</p>
            <p className='font-normal'>Capital: {country.capital}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
