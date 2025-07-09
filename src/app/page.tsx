'use client'
import { useEffect } from 'react'
import { useCache, CountryBasic } from '@/store/cache'

import SearchBar from '@/components/searchBar'
import Filter from '@/components/filter'
import Card from '@/components/card'


export default function HomePage() {
  const countries = useCache((s) => s.countries)
  const setCountries = useCache((s) => s.setCountries)
  const region = useCache((s) => s.region)
  const search = useCache((s) => s.search)

  useEffect(() => {
    if (countries.length === 0) {
      fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital')
        .then(res => res.json())
        .then((data: CountryBasic[]) => setCountries(data))
    }
  }, [countries.length, setCountries])

  const filteredCountries = countries.filter(c => {
    const matchesRegion = region ? c.region === region : true
    const matchesSearch = search ? (
      c.name.common.toLowerCase().includes(search.toLowerCase()) ||
      c.name.official.toLowerCase().includes(search.toLowerCase())
    ) : true
    return matchesRegion && matchesSearch
  })

  return (
    <main className='px-4 sm:px-10 md:px-20 lg:px-40 xl:px-80'>
      <div className='flex flex-col md:flex-row my-8 md:my-14 h-auto md:h-10 justify-between gap-4'>
        <SearchBar />
        <Filter />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12'>
        {filteredCountries.map((country, i) => (
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