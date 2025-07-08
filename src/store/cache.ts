import { create } from 'zustand'

export type Country = {
  flags: {
    svg: string
  },
  name: {
    common: string
    official: string
  },
  capital: string[],
  region: string,
  subregion: string,
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  },
  population: number,
  languages: {
    [key: string]: string
  },
}

type State = {
  countries: Country[],
  filteredCountries: Country[]
}

type Actions = {
  setCache: (property: keyof State, value: any) => void
}

export const useCache = create<State & Actions>(set => ({
  countries: [],
  filteredCountries: [],
  setCache: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))