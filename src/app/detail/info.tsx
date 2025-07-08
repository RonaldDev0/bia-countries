import type { CountryDetail } from '@/store/cache'

export default function info ({ country }: { country: CountryDetail }) {
  return (
    <div>
        <div>
          <h1 className='font-bold text-3xl mb-8'>
            {country.name.common}
          </h1>
          <div className='flex gap-24'>
            <div className='space-y-2'>
              <p>
                <b className='font-bold text-lg'>Native Name: </b>
                {country.name.official}
              </p>
              <p>
                <b className='font-bold text-lg'>Population: </b>
                {country.population.toLocaleString()}
              </p>
              <p>
                <b className='font-bold text-lg'>Region: </b>
                {country.region}
              </p>
              <p>
                <b className='font-bold text-lg'>Sub Region: </b>
                {country.subregion}
              </p>
              <p>
                <b className='font-bold text-lg'>Capital: </b>
                {country.capital}
              </p>
            </div>
            <div className='space-y-2'>
              <p>
                <b className='font-bold text-lg'>Top Level Domain: </b>
                {country.tld && country.tld.length > 0 ? country.tld.join(', ') : 'N/A'}
              </p>
              <p>
                <b className='font-bold text-lg'>Currencies: </b>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map(c => `${c.name} (${c.symbol})`)
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <b className='font-bold text-lg'>Languages: </b>
                {country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        {country.borders && country.borders.length > 0 && (
          <div className='mt-16 flex items-center gap-3'>
            <p className='font-bold text-lg'>Border Countries:</p>
            {country.borders.map(border => (
              <div key={border} className='bg-slate-800 rounded-lg px-4 py-2'>
                {border}
              </div>
            ))}
          </div>
        )}
      </div>
  )
}