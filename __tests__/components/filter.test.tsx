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
    region: '',
    setRegion: vi.fn()
  }))
})

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

test('renders filter select', async () => {
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)
  expect(screen.getByLabelText('Filter by region')).toBeTruthy()
})

test('displays all regions as options', async () => {
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  regions.forEach(region => {
    expect(screen.getByText(region)).toBeTruthy()
  })
})

test('displays default option', async () => {
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)
  expect(screen.getByText('Filter by Region')).toBeTruthy()
})

test('displays current region value', async () => {
  mockUseCache.mockImplementation(selector => selector({
    region: 'Americas',
    setRegion: vi.fn()
  }))
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)

  const select = screen.getByLabelText('Filter by region')
  expect((select as HTMLSelectElement).value).toBe('Americas')
})

test('calls setRegion when user selects a region', async () => {
  const mockSetRegion = vi.fn()
  mockUseCache.mockImplementation(selector => selector({
    region: '',
    setRegion: mockSetRegion
  }))
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)

  const select = screen.getByLabelText('Filter by region')
  fireEvent.change(select, { target: { value: 'Europe' } })

  expect(mockSetRegion).toHaveBeenCalledWith('Europe')
})

test('handles empty region selection', async () => {
  const mockSetRegion = vi.fn()
  mockUseCache.mockImplementation(selector => selector({
    region: 'Asia',
    setRegion: mockSetRegion
  }))
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)

  const select = screen.getByLabelText('Filter by region')
  fireEvent.change(select, { target: { value: '' } })

  expect(mockSetRegion).toHaveBeenCalledWith('')
})

test('renders dropdown arrow icon', async () => {
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)

  const arrow = screen.getByTestId('dropdown-arrow')
  expect(arrow).toBeTruthy()
})

test('has proper accessibility attributes', async () => {
  const { default: Filter } = await import('@/components/filter')
  render(<Filter />)

  const select = screen.getByLabelText('Filter by region')
  expect(select.getAttribute('aria-label')).toBe('Filter by region')
})