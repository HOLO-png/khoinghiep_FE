import {create} from 'zustand'
import { ApiCore } from '../ApiCore'
import { LIGHT_ENDPOINT } from '../constant/APIEndpoint'

export const lefOff = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png'
export const lefOn = 'https://i.postimg.cc/6QyTynzr/bulb-on.png'

export const useLightStore = create((set, get) => {
  const handleFetchApi = async () => {
    try {
      const response = await ApiCore.get(LIGHT_ENDPOINT)
      const led = response.data.Led?.Status
      set({ isTurnOn: led })
    } catch (error) {
      console.log(error)
      set({ isTurnOn: 0 })
    }
  }
  handleFetchApi()

  return {
    isTurnOn: 0,
    light: get()?.isTurnOn ? lefOff : lefOn,
    setStatusLightApi: async (endpoint, params, socket, onSuccess) => {
      set({ isLoading: true })
      try {
        const response = await ApiCore.post(endpoint, params)
        set({ isTurnOn: response.data, isLoading: false })
        socket?.emit('testLight', response.data)
        onSuccess(response.data)
      } catch (error) {
        console.log(error)
        set({ isTurnOn: 0, isLoading: false })
      }
    },
    getLightStatus: () => {
      if (get()?.isTurnOn === 0) {
        set({ light: lefOff })
      } else {
        set({ light: lefOn })
      }
    },
    setIsTurnOn: (isTurnOn) => {
      set({ isTurnOn })
    }
  }
})
