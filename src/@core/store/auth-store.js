import {create} from 'zustand'
import { ApiCore } from '../ApiCore'
import { NotificationType } from '../components/notification'
import { setCookie } from '../utils/cookie'

export const useAuthStore = create((set) => {
  return {
    auth: null,
    isError: false,
    isSubmitting: false,
    loginApi: async (endpoint, params, onNotify, onSuccess, dispatchLoading) => {
      try {
        const response = await ApiCore.post(endpoint, params)
        set({ auth: response.data, isSubmitting: false, isError: false })
        onSuccess()
        const expires = new Date(Date.now() + 24 * 60 * 60 * 60 * 5).toUTCString()
        setCookie('access', response.data.access_token, expires)
      } catch (error) {
        console.log(error)
        onNotify(NotificationType.ERROR, error.response?.data.msg)
        set({ isError: true, isSubmitting: false })
        dispatchLoading(false)
      }
    },
    registerApi: async (endpoint, params, onNotify, onSuccess) => {
      set({ isSubmitting: true })
      console.log(params);
      try {
        const response = await ApiCore.post(endpoint, params)
        console.log(response)
        set({ auth: response.data, isSubmitting: false, isError: false })
        onNotify(NotificationType.SUCCESS, response.data.msg)
        onSuccess()
      } catch (error) {
        console.log(error)
        onNotify(NotificationType.ERROR, error.response?.data.msg)
        set({ isError: true, isSubmitting: false })
      }
    },
    forgotPasswordApi: async (endpoint, params, onNotify) => {
      set({ isSubmitting: true })
      try {
        const response = await ApiCore.post(endpoint, params)
        set({ isSubmitting: false, isError: false })
        onNotify(NotificationType.SUCCESS, response.data.msg)
      } catch (error) {
        console.log(error)
        onNotify(NotificationType.ERROR, error.response?.data.msg)
        set({ isError: true, isSubmitting: false })
      }
    },
    resetPasswordApi: async (endpoint, params, onNotify, onSuccess, token) => {
      set({ isSubmitting: true })
      console.log(token)
      try {
        const response = await ApiCore.post(endpoint, params, {
          headers: { Authorization: token }
        })
        set({ isSubmitting: false, isError: false })
        onNotify(NotificationType.SUCCESS, response.data.msg)
        onSuccess()
      } catch (error) {
        console.log(error)
        onNotify(NotificationType.ERROR, error.response?.data.msg)
        set({ isError: true, isSubmitting: false })
      }
    },
    updateUserData: async (endpoint, params, auth, dispatchNotification, onSuccess) => {
      try {
        const res = await ApiCore.patch(endpoint, params, {
          headers: { Authorization: auth.access_token }
        })
        onSuccess({ user: { ...auth.user, ...res.data.data } })
        dispatchNotification('info', 'Updated user', 'You changed user information successfuly')
      } catch (error) {
        console.log(error);
      }
    }
  }
})
