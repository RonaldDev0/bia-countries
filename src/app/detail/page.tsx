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
    <main className='min-h-[calc(100vh-56px)] flex flex-col px-32 py-12'>
      <Link
        href='/'
        style={{
          background: 'var(--element-bg)',
          color: 'var(--foreground)',
          boxShadow: '0 2px 9px 0 rgba(0,0,0,0.05)',
          borderRadius: '0.25rem',
          padding: '0.5rem 2.5rem',
          fontWeight: 300,
          fontSize: '1.1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          width: 'fit-content',
          marginBottom: '2.5rem'
        }}
      >
        <span style={{ fontSize: '1.3rem', display: 'inline-block' }}>&larr;</span>
        Back
      </Link>
      <div className='flex-1 flex justify-center items-center'>
        <div className='flex gap-24 items-center'>
          <Image
            src={country.flags.svg}
            alt={country.name.official}
            width={490}
            height={350}
            className='rounded-lg w-[490px] h-[350px] object-cover'
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
