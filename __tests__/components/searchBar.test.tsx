import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

const mockUseCache = vi.fn()
vi.mock('@/store/cache', () => ({
  useCache: mockUseCache
}))

beforeEach(() => {
  mockUseCache.mockReset()
  cleanup()
  mockUseCache.mockImplementation(selector => selector({
    search: '',
    setSearch: vi.fn()
  }))
})

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

test('renders search input', async () => {
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)
  expect(screen.getByPlaceholderText('Search for a country...')).toBeTruthy()
})

test('renders search icon', async () => {
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)
  expect(screen.getByTestId('search-icon')).toBeTruthy()
})

test('displays current search value', async () => {
  mockUseCache.mockImplementation(selector => selector({
    search: 'colombia',
    setSearch: vi.fn()
  }))
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)
  expect(screen.getByDisplayValue('colombia')).toBeTruthy()
})

test('calls setSearch when user types', async () => {
  const mockSetSearch = vi.fn()
  mockUseCache.mockImplementation(selector => selector({
    search: '',
    setSearch: mockSetSearch
  }))
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)

  const input = screen.getByPlaceholderText('Search for a country...')
  fireEvent.change(input, { target: { value: 'brazil' } })

  expect(mockSetSearch).toHaveBeenCalledWith('brazil')
})

test('updates input value when typing', async () => {
  const mockSetSearch = vi.fn()
  mockUseCache.mockImplementation(selector => selector({
    search: 'argentina',
    setSearch: mockSetSearch
  }))
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)

  const input = screen.getByPlaceholderText('Search for a country...')
  expect((input as HTMLInputElement).value).toBe('argentina')
})

test('handles empty search value', async () => {
  const mockSetSearch = vi.fn()
  mockUseCache.mockImplementation(selector => selector({
    search: 'test',
    setSearch: mockSetSearch
  }))
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)

  const input = screen.getByPlaceholderText('Search for a country...')
  fireEvent.change(input, { target: { value: '' } })

  expect(mockSetSearch).toHaveBeenCalledWith('')
})

test('has proper accessibility attributes', async () => {
  const { default: SearchBar } = await import('@/components/searchBar')
  render(<SearchBar />)

  const input = screen.getByPlaceholderText('Search for a country...')
  expect(input.getAttribute('aria-label')).toBe('Search for a country')
})