'use client'
import { useSearchParams } from 'next/navigation'
import { useCache, type Country } from '@/store/cache'
import Image from 'next/image'
import Link from 'next/link'
import Info from './info'

export default function DetailPage() {
  const { countries } = useCache()

  const searchParams = useSearchParams()
  const data = searchParams.get('country')
  const country: Country = countries.filter(country => country.name.official === data)[0]

  return (
    <main className='flex justify-center items-center h-[90dvh] gap-12'>
      <div>
        <Link href='/' className='fixed top-40'> &larr; Back</Link>
        <Image
          src={country.flags.svg}
          alt={country.name.official}
          width={490}
          height={350}
          className="rounded-lg w-[490px] h-[350px] object-cover"
        />
      </div>
      <Info country={country} />
    </main>
  )
}
