import { create } from 'zustand'

export interface Customer{
  nationalID: number,
  name: string,
  lastname: string,
  image: string
}
export interface Attraction{
  attName: string,
  price: number,
  phone: number
}

export interface Reservation{
  attName: string,
  nationalID: string,
  date: string
}

export interface Store {
  customers: Customer[]
  attractions: Attraction[]
  reservations: Reservation[]
  set: (customers: Customer[], attractions: Attraction[], reservations: Reservation[]) => void

  selectedCustomer:{customer: Customer | undefined, places: string[], timesReserved: number[]}
  setSelectedCustomer: (customer: Customer, places: string[], timesReserved: number[]) => void

  selectedAttraction: {attraction: string| undefined ,names: string[], gross: number[]}
  setSelectedAttraction: (attraction: string ,names: string[], gross: number[]) => void
}

export const useStore = create<Store>()((set) => ({
  customers: [],
  attractions: [],
  reservations: [],
  set: (customers: Customer[], attractions: Attraction[], reservations: Reservation[]) => {
    set((state) => ({ ...state ,customers:customers,attractions:attractions, reservations: reservations }));
  },

  selectedCustomer: {customer: undefined ,places:[], timesReserved:[]},
  setSelectedCustomer: (customer: Customer, places: string[], timesReserved: number[]) =>
    set(state => ({ ...state,selectedCustomer: {customer: customer, timesReserved: timesReserved, places: places} })),

  selectedAttraction: {attraction:  undefined ,names: [], gross: []},
  setSelectedAttraction: (attraction: string ,names: string[], gross: number[]) =>
    set(state => ({ ...state, selectedAttraction: {attraction: attraction, names: names, gross: gross} })),
}))
