import type { CountryDetail } from '@/store/cache'

export default function info ({ country }: { country: CountryDetail }) {
  return (
    <div className='max-w-4xl mx-auto w-full'>
        <div>
          <h1 className='font-bold text-3xl mb-8'>
            {country.name.common}
          </h1>
          <div className='flex flex-col gap-8 md:flex-row md:gap-16 w-full'>
            <div className='space-y-2 w-full md:w-1/2'>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Native Name: </b>
                {country.name.official}
              </p>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Population: </b>
                {country.population.toLocaleString()}
              </p>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Region: </b>
                {country.region}
              </p>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Sub Region: </b>
                {country.subregion}
              </p>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Capital: </b>
                {country.capital}
              </p>
            </div>
            <div className='space-y-2 mt-6 md:mt-0 w-full md:w-1/2'>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Top Level Domain: </b>
                {country.tld && country.tld.length > 0 ? country.tld.join(', ') : 'N/A'}
              </p>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Currencies: </b>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map(c => `${c.name} (${c.symbol})`)
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <b className='font-bold text-lg whitespace-nowrap'>Languages: </b>
                {country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        {country.borders && country.borders.length > 0 && (
          <div className='mt-10 md:mt-16 flex flex-col md:flex-row md:items-center gap-3 md:gap-3 flex-wrap'>
            <p className='font-bold text-lg mb-2 md:mb-0'>Border Countries:</p>
            <div className='flex flex-wrap gap-2'>
              {country.borders.map(border => (
                <div
                  key={border}
                  className='chip-border-country bg-[var(--chip-bg)] text-[var(--foreground)] rounded-lg px-4 py-1 font-medium text-base transition hover:bg-[var(--element-bg)] hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer'
                  tabIndex={0}
                  aria-label={`Border country: ${border}`}
                >
                  {border}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  )
}