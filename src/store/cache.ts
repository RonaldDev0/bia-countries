import { create } from 'zustand'

export type CountryBasic = {
  name: { common: string; official: string }
  flags: { svg: string }
  region: string
  population: number
  capital: string[]
}

export type CountryDetail = {
  flags: { svg: string }
  name: { common: string; official: string }
  capital: string[]
  region: string
  subregion: string
  currencies: { [key: string]: { name: string; symbol: string } }
  population: number
  languages: { [key: string]: string }
}

type State = {
  countries: CountryBasic[]
  details: { [officialName: string]: CountryDetail }
  setCountries: (countries: CountryBasic[]) => void
  setDetail: (name: string, detail: CountryDetail) => void
  region: string
  setRegion: (region: string) => void
  search: string
  setSearch: (search: string) => void
}

export const useCache = create<State>((set) => ({
  countries: [],
  details: {},
  region: '',
  search: '',
  setCountries: (countries) => set({ countries }),
  setDetail: (name, detail) =>
    set((state) => ({
      details: { ...state.details, [name]: detail }
    })),
  setRegion: (region) => set({ region }),
  setSearch: (search) => set({ search })
}))