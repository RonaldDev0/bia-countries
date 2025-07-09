import { expect, test, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

const mockCountry = {
  name: { common: 'Colombia', official: 'Republic of Colombia' },
  flags: { svg: 'https://flagcdn.com/co.svg' },
  region: 'Americas',
  population: 50882884,
  capital: ['Bogotá']
}

beforeEach(() => {
  cleanup()
})

afterEach(() => {
  cleanup()
})

test('renders country name', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)
  expect(screen.getByText('Colombia')).toBeTruthy()
})

test('renders country flag image', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)

  const flag = screen.getByAltText('Republic of Colombia')
  expect(flag).toBeTruthy()
  expect(flag.getAttribute('src')).toBe('https://flagcdn.com/co.svg')
})

test('renders population information', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)

  expect(screen.getByText(/Population:/)).toBeTruthy()
  expect(screen.getByText(/50,882,884/)).toBeTruthy()
})

test('renders region information', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)

  expect(screen.getByText(/Region:/)).toBeTruthy()
  expect(screen.getByText(/Americas/)).toBeTruthy()
})

test('renders capital information', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)

  expect(screen.getByText(/Capital:/)).toBeTruthy()
  expect(screen.getByText(/Bogotá/)).toBeTruthy()
})

test('renders as a link to detail page', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)

  const link = screen.getByRole('link')
  expect(link.getAttribute('href')).toBe('/detail?country=Republic of Colombia')
})

test('applies priority prop to image', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} priority={true} />)

  const flag = screen.getByAltText('Republic of Colombia')
  expect(flag).toBeTruthy()
  // Next.js Image component handles priority internally, we just verify it renders
})

test('handles country without priority prop', async () => {
  const { default: Card } = await import('@/components/card')
  render(<Card country={mockCountry} />)

  const flag = screen.getByAltText('Republic of Colombia')
  expect(flag).toBeTruthy()
  // Next.js Image component handles priority internally, we just verify it renders
})

test('handles multiple capitals', async () => {
  const countryWithMultipleCapitals = {
    ...mockCountry,
    capital: ['Bogotá', 'Medellín']
  }

  const { default: Card } = await import('@/components/card')
  render(<Card country={countryWithMultipleCapitals} />)

  expect(screen.getByText(/Bogotá/)).toBeTruthy()
  expect(screen.getByText(/Medellín/)).toBeTruthy()
})

test('handles country without capital', async () => {
  const countryWithoutCapital = {
    ...mockCountry,
    capital: []
  }

  const { default: Card } = await import('@/components/card')
  render(<Card country={countryWithoutCapital} />)

  expect(screen.getByText(/Capital:/)).toBeTruthy()
  expect(screen.queryByText('Bogotá')).toBeNull()
})