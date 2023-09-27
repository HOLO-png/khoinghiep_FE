import {create} from 'zustand'

export const useLoadingStore = create((set) => {
  return {
    loading: false,
    dispatchLoading: (status) => {
      set({ loading: status })
    }
  }
})
