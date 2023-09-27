import {create} from 'zustand'

export const useChatBoxStore = create((set, get) => {
  return {
    messenges: [],
    dispatchMessenge: (data) => {
      set({ messenges: [...get().messenges, data] })
    }
  }
})
