import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { useCache } from '@/store/cache'

const mockCountry = {
  name: { common: 'Colombia', official: 'Republic of Colombia' },
  flags: { svg: 'https://flagcdn.com/co.svg' },
  region: 'Americas',
  population: 50882884,
  capital: ['Bogotá']
}

const mockCountryDetail = {
  flags: { svg: 'https://flagcdn.com/co.svg' },
  name: { common: 'Colombia', official: 'Republic of Colombia' },
  capital: ['Bogotá'],
  region: 'Americas',
  subregion: 'South America',
  currencies: { COP: { name: 'Colombian peso', symbol: '$' } },
  population: 50882884,
  languages: { spa: 'Spanish' },
  tld: ['.co'],
  borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN']
}

beforeEach(() => {
  // Reset store to initial state
  const state = useCache.getState()
  state.setCountries([])
  state.setRegion('')
  state.setSearch('')
  // Clear all details
  Object.keys(state.details).forEach(key => {
    state.setDetail(key, null as any)
  })
})

afterEach(() => {
  vi.clearAllMocks()
})

test('initial state is correct', () => {
  const state = useCache.getState()

  expect(state.countries).toEqual([])
  expect(state.region).toBe('')
  expect(state.search).toBe('')
  expect(state.details).toEqual({})
})

test('setCountries updates countries array', () => {
  const state = useCache.getState()
  state.setCountries([mockCountry])

  const updatedState = useCache.getState()
  expect(updatedState.countries).toEqual([mockCountry])
})

test('setRegion updates region value', () => {
  const state = useCache.getState()
  state.setRegion('Americas')

  const updatedState = useCache.getState()
  expect(updatedState.region).toBe('Americas')
})

test('setSearch updates search value', () => {
  const state = useCache.getState()
  state.setSearch('colombia')

  const updatedState = useCache.getState()
  expect(updatedState.search).toBe('colombia')
})

test('setDetail adds country to details', () => {
  const state = useCache.getState()
  state.setDetail('Republic of Colombia', mockCountryDetail)

  const updatedState = useCache.getState()
  expect(updatedState.details['Republic of Colombia']).toEqual(mockCountryDetail)
})

test('setDetail updates existing country detail', () => {
  const state = useCache.getState()
  state.setDetail('Republic of Colombia', mockCountryDetail)

  const updatedDetail = { ...mockCountryDetail, population: 1000000 }
  state.setDetail('Republic of Colombia', updatedDetail)

  const updatedState = useCache.getState()
  expect(updatedState.details['Republic of Colombia']).toEqual(updatedDetail)
})

test('setDetail preserves other details when adding new one', () => {
  const state = useCache.getState()
  state.setDetail('Brazil', { ...mockCountryDetail, name: { common: 'Brazil', official: 'Brazil' } })
  state.setDetail('Colombia', mockCountryDetail)

  const updatedState = useCache.getState()
  expect(updatedState.details['Brazil']).toBeTruthy()
  expect(updatedState.details['Colombia']).toBeTruthy()
})

test('setCountries replaces entire countries array', () => {
  const state = useCache.getState()
  state.setCountries([mockCountry])
  state.setCountries([])

  const updatedState = useCache.getState()
  expect(updatedState.countries).toEqual([])
})

test('setRegion handles empty string', () => {
  const state = useCache.getState()
  state.setRegion('Americas')
  state.setRegion('')

  const updatedState = useCache.getState()
  expect(updatedState.region).toBe('')
})

test('setSearch handles empty string', () => {
  const state = useCache.getState()
  state.setSearch('colombia')
  state.setSearch('')

  const updatedState = useCache.getState()
  expect(updatedState.search).toBe('')
})

test('multiple state updates work correctly', () => {
  const state = useCache.getState()
  state.setCountries([mockCountry])
  state.setRegion('Americas')
  state.setSearch('col')

  const updatedState = useCache.getState()
  expect(updatedState.countries).toEqual([mockCountry])
  expect(updatedState.region).toBe('Americas')
  expect(updatedState.search).toBe('col')
})