'use client'
import { useEffect } from 'react'
import { useCache, CountryBasic } from '@/store/cache'

import SearchBar from '@/components/searchBar'
import Filter from '@/components/filter'
import Card from '@/components/card'


export default function HomePage() {
  const countries = useCache((s) => s.countries)
  const setCountries = useCache((s) => s.setCountries)

  useEffect(() => {
    if (countries.length === 0) {
      fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital')
        .then(res => res.json())
        .then((data: CountryBasic[]) => setCountries(data))
    }
  }, [countries.length, setCountries])

  return (
    <main className='px-80'>
      <div className='flex my-14 h-10 justify-between'>
        <SearchBar />
        <Filter />
      </div>
      <div className='grid grid-cols-4 gap-12'>
        {countries.map((country, i) => (
          <Card
            key={i}
            country={country}
            priority={i < 9}
          />
        ))}
      </div>
    </main>
  )
}