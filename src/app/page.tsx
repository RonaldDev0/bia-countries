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
    <main className='px-4 sm:px-8 md:px-16 lg:px-32 xl:px-80 py-6 max-w-[1440px] mx-auto'>
      <div className='flex flex-col gap-2 my-4 md:my-6 md:flex-row md:items-center md:justify-between'>
        <SearchBar />
        <div className='w-full md:w-auto'>
          <Filter />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch'>
        {filteredCountries.map((country, i) => (
          <div key={i} className='max-w-sm w-full mx-auto'>
            <Card
              country={country}
              priority={i < 9}
            />
          </div>
        ))}
      </div>
    </main>
  )
}