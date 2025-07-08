'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCache, CountryDetail } from '@/store/cache'
import Image from 'next/image'
import Link from 'next/link'
import Info from './info'

function DetailContent() {
  const details = useCache((s) => s.details)
  const setDetail = useCache((s) => s.setDetail)
  const [country, setCountry] = useState<CountryDetail | null>(null)
  const searchParams = useSearchParams()
  const officialName = searchParams.get('country')

  useEffect(() => {
    if (!officialName) return
    if (details[officialName]) {
      setCountry(details[officialName])
    } else {
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(officialName)}?fullText=true&fields=name,capital,flags,population,region,subregion,languages,currencies`)
        .then(res => res.json())
        .then((data: CountryDetail[]) => {
          if (data && data[0]) {
            setDetail(officialName, data[0])
            setCountry(data[0])
          }
        })
    }
  }, [officialName, details, setDetail])

  if (!country) return null

  return (
    <main className='flex justify-center items-center h-[90dvh] gap-12'>
      <div>
        <Link href='/' className='fixed top-40'> &larr; Back</Link>
        <Image
          src={country.flags.svg}
          alt={country.name.official}
          width={490}
          height={350}
          className='rounded-lg w-[490px] h-[350px] object-cover'
          priority
        />
      </div>
      <Info country={country} />
    </main>
  )
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailContent />
    </Suspense>
  )
}
