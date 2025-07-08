'use client'
import { useEffect } from 'react'
import { useCache } from '@/store/cache'

import SearchBar from '@/components/searchBar'
import Filter from '@/components/filter'
import Card from '@/components/card'


export default function Home () {
  const { countries, setCache } = useCache()

  useEffect(() => {
    async function getData () {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,languages,currencies')
      const data = await response.json()
      setCache('countries', data)
    }

    getData()
  }, [])

  return (
    <main className='px-80'>
      <div className='flex my-14 h-10 justify-between'>
        <SearchBar />
        <Filter />
      </div>
      <div className='grid grid-cols-4 gap-12'>
        {countries.map((country, i) => (
          <Card key={i} country={country} />
        ))}
      </div>
    </main>
  )
}