import Link from 'next/link'
import Image from 'next/image'

import type { Country } from '@/store/cache'

export default function Card ({ country }: { country: Country }) {
  return (
   <Link href={`/detail?country=${country.name.official}`}>
      <div className='flex flex-col justify-center rounded-lg bg-slate-800'>
        <Image
          src={country.flags.svg}
          alt={country.name.official}
          width={270}
          height={180}
          className="rounded-t-lg w-full h-[180px] object-cover"
        />
        <div className='p-4 pb-8 space-y-1'>
          <p className='mb-4 font-bold text-lg'>{country.name.common}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
        </div>
      </div>
    </Link>
  )
}
