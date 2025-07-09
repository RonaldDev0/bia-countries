import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

const mockUseCache = vi.fn()
vi.mock('@/store/cache', () => ({
  useCache: mockUseCache
}))

const mockUseSearchParams = vi.fn()
vi.mock('next/navigation', () => ({
  useSearchParams: mockUseSearchParams
}))

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
  mockUseCache.mockReset()
  mockUseSearchParams.mockReset()
  cleanup()
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))
  mockUseSearchParams.mockReturnValue({
    get: vi.fn().mockReturnValue('Republic of Colombia')
  })
})

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

test('renders main element', async () => {
  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)
  expect(screen.getByRole('main')).toBeTruthy()
})

test('renders back button', async () => {
  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)
  expect(screen.getByText('Back')).toBeTruthy()
})

test('back button links to home', async () => {
  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  const backLink = screen.getByRole('link', { name: /back/i })
  expect(backLink.getAttribute('href')).toBe('/')
})

test('renders country flag when country exists', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  const flag = screen.getByAltText('Republic of Colombia')
  expect(flag).toBeTruthy()
  expect(flag.getAttribute('src')).toBe('https://flagcdn.com/co.svg')
})

test('renders country name when country exists', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.getByText('Colombia')).toBeTruthy()
})

test('renders country information when country exists', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.getByText(/Population:/)).toBeTruthy()
  expect(screen.getByText(/50,882,884/)).toBeTruthy()
  expect(screen.getAllByText(/Region:/).length).toBeGreaterThan(0)
  expect(screen.getByText(/Americas/)).toBeTruthy()
  expect(screen.getByText(/Capital:/)).toBeTruthy()
  expect(screen.getByText(/Bogotá/)).toBeTruthy()
})

test('renders subregion information', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.getByText(/Sub Region:/)).toBeTruthy()
  expect(screen.getByText(/South America/)).toBeTruthy()
})

test('renders currencies information', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.getByText(/Currencies:/)).toBeTruthy()
  expect(screen.getByText(/Colombian peso/)).toBeTruthy()
})

test('renders languages information', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.getByText(/Languages:/)).toBeTruthy()
  expect(screen.getByText(/Spanish/)).toBeTruthy()
})

test('renders borders information', async () => {
  mockUseCache.mockImplementation(selector => selector({
    details: { 'Republic of Colombia': mockCountryDetail },
    setDetail: vi.fn()
  }))

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.getByText(/Border Countries:/)).toBeTruthy()
  expect(screen.getByText(/BRA/)).toBeTruthy()
  expect(screen.getByText(/ECU/)).toBeTruthy()
})

test('does not render content when no country', async () => {
  mockUseSearchParams.mockReturnValue({
    get: vi.fn().mockReturnValue(null)
  })

  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  expect(screen.queryByText('Colombia')).toBeNull()
  expect(screen.queryByText(/Population:/)).toBeNull()
})

test('has proper accessibility attributes', async () => {
  const { default: DetailPage } = await import('@/app/detail/page')
  render(<DetailPage />)

  const backButton = screen.getByRole('link', { name: /back/i })
  expect(backButton.getAttribute('aria-label')).toBe('Back to home')
})