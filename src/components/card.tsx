import Link from 'next/link'
import Image from 'next/image'

import type { CountryBasic } from '@/store/cache'

export default function Card ({ country, priority }: { country: CountryBasic, priority?: boolean }) {
  return (
   <Link href={`/detail?country=${country.name.official}`} className='focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg block transition'>
      <div
        className='flex flex-col justify-center rounded-2xl border border-amber-300 shadow-2xl dark:border-none dark:shadow-none bg-[var(--element-bg)] transition hover:scale-[1.02] hover:shadow-lg'
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
        <div className='p-4 pb-10 space-y-1'>
          <p className='mb-4 font-bold text-lg'>{country.name.common}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
        </div>
      </div>
    </Link>
  )
}
