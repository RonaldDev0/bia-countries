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
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(officialName)}?fullText=true&fields=name,capital,flags,population,region,subregion,languages,currencies,tld,borders`)
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
    <main className='min-h-[calc(100vh-56px)] flex flex-col py-8 text-[16px] max-w-[1440px] mx-auto'>
      <div className='w-full flex justify-start mb-10 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-80'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 px-5 py-2 rounded-md font-light text-lg bg-[var(--element-bg)] text-[var(--foreground)] shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition hover:bg-[var(--chip-bg)] dark:hover:bg-[var(--chip-bg)] w-fit'
          aria-label='Back to home'
        >
          <span className='text-2xl'>&larr;</span>
          Back
        </Link>
      </div>
      <div className='flex-1 flex justify-center items-center w-full px-5 sm:px-8 md:px-16 lg:px-32 xl:px-80'>
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-24 items-center w-full max-w-5xl mx-auto'>
          <Image
            src={country.flags.svg}
            alt={country.name.official}
            width={450}
            height={350}
            className='rounded-lg w-full max-w-[450px] h-auto aspect-[7/5] object-cover'
            priority
          />
          <Info country={country} />
        </div>
      </div>
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
