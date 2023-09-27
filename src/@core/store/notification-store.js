import {create} from 'zustand'
import { ApiCore } from '../ApiCore'
import { NOTIFIES_ENDPOINT, NOTIFY_ENDPOINT } from '../constant/APIEndpoint'

export const useNotificationStore = create((set, get) => {
  let timeoutId;

  const notification = (label, des) => {
    Notification.requestPermission().then(function (perm) {
      console.log(perm);
      if (perm === 'granted') {
        new Notification(label, {
          body: des
        })
      }
    })
  }

  return {
    notification: { type: '', label: '', description: '' },
    notifies: [],
    dispatchNotification: (type, label, description) => {
      clearTimeout(timeoutId)
      set({ notification: { type, label, description } })
      timeoutId = setTimeout(() => set({ notification: undefined }), 5000)
      notification(label, description)
    },
    createNotify: async ({ params, socket }) => {
      if (params) {
        get().dispatchNotification('info', params?.title, params?.body)
        socket.emit('createNotify', params)
      }
    },
    removeNotify: async ({ params, auth, socket }) => {
      try {
        const response = await ApiCore.delete(`${NOTIFY_ENDPOINT
          }/${params.id}`, {
          headers: { Authorization: auth.access_token }
        })
        socket.emit('removeNotify', {
          ...response.data.notify,
          user: {
            username: auth.user.fullname,
            avatar: auth.user.avatar
          }
        })
      } catch (err) {
        console.log(err);
      }
    },
    getNotifies: async ({ auth }) => {
      try {
        const response = await ApiCore.get(NOTIFIES_ENDPOINT, {
          headers: { Authorization: auth.access_token }
        })

        set({ notifies: response.data })
      } catch (error) {
        console.log(error)
      }
    },
    updateNotifies: (notify) => {
      if (notify) {
        set({ notifies: [notify, ...get().notifies] })
      }
    }
  }
})
