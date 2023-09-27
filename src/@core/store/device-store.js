import {create} from 'zustand'
import { ApiCore } from '../ApiCore'

export const useDeviceStore = create((set) => {
  return {
    device: null,
    getDeviceStatus: async (endpoint, auth, socket) => {
      try {
        const response = await ApiCore.get(endpoint, null, {
          headers: { Authorization: auth.access_token }
        })
        set({ device: response.data, isLoading: false })
        socket?.emit('testTemHumi', response.data)
      } catch (error) {
        console.log(error)
        set({ isTurnOn: 0, isLoading: false })
      }
    }
  }
})
