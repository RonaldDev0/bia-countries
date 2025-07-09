import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

const mockUseCache = vi.fn()
vi.mock('@/store/cache', () => ({
  useCache: mockUseCache
}))

const mockCountry = {
  name: { common: 'Colombia', official: 'Republic of Colombia' },
  flags: { svg: 'https://flagcdn.com/co.svg' },
  region: 'Americas',
  population: 50882884,
  capital: ['Bogotá']
}

beforeEach(() => {
  mockUseCache.mockReset()
  cleanup()
  mockUseCache.mockImplementation(selector => selector({
    countries: [],
    setCountries: () => {},
    region: '',
    search: ''
  }))
})

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

test('renders the main element', async () => {
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.getByRole('main')).toBeTruthy()
})

test('renders the SearchBar', async () => {
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.getAllByPlaceholderText('Search for a country...').length).toBeGreaterThan(0)
})

test('renders the Filter', async () => {
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.getAllByLabelText('Filter by region').length).toBeGreaterThan(0)
})

test('renders no cards when there are no countries', async () => {
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.queryByText('Population:')).toBeNull()
})

test('renders cards when countries are present', async () => {
  mockUseCache.mockImplementation(selector => selector({
    countries: [mockCountry],
    setCountries: () => {},
    region: '',
    search: ''
  }))
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.getAllByText('Colombia').length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Population:/).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Bogotá/).length).toBeGreaterThan(0)
})

test('filters countries by region', async () => {
  mockUseCache.mockImplementation(selector => selector({
    countries: [mockCountry],
    setCountries: () => {},
    region: 'Americas',
    search: ''
  }))
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.getAllByText('Colombia').length).toBeGreaterThan(0)
})

test('does not show country if region filter does not match', async () => {
  mockUseCache.mockImplementation(selector => selector({
    countries: [mockCountry],
    setCountries: () => {},
    region: 'Asia',
    search: ''
  }))
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.queryAllByText('Colombia').length).toBe(0)
})

test('filters countries by search', async () => {
  mockUseCache.mockImplementation(selector => selector({
    countries: [mockCountry],
    setCountries: () => {},
    region: '',
    search: 'col'
  }))
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.getAllByText('Colombia').length).toBeGreaterThan(0)
})

test('does not show country if search does not match', async () => {
  mockUseCache.mockImplementation(selector => selector({
    countries: [mockCountry],
    setCountries: () => {},
    region: '',
    search: 'nomatch'
  }))
  const { default: HomePage } = await import('@/app/page')
  render(<HomePage />)
  expect(screen.queryAllByText('Colombia').length).toBe(0)
})