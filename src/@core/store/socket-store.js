import {create} from 'zustand'

export const useSocketStore = create((set) => {
  return {
    setSocketApi: async (socket) => {
      set({ socket: socket })
    }
  }
})