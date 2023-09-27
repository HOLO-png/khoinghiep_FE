import axios from 'axios'
import { API_URL } from 'src/@core/constant/APIEndpoint'

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

axios.interceptors.request.use(function (config) {
  config.baseURL = API_URL

  return config
})

export const ApiCore = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}

export const handleError = (err, dispatchNotification) => {
  const statusErr = err.response?.status
  if (statusErr === 401) {
    location.replace('/login')
  } else if (statusErr === 403) {
    location.replace('/not-found')
  } else {
    dispatchNotification && dispatchNotification('error', 'API request failed')
  }
}

export const invokeRequest = async (options) => {
  const { baseURL, params, method = 'GET', onSuccess, onError } = options
  const endpointRequest = params ? `${baseURL}?${params}` : baseURL

  try {
    let response
    if (method === HttpMethod.DELETE) response = await ApiCore.delete(endpointRequest)
    else if (method === HttpMethod.PATCH) response = await ApiCore.patch(endpointRequest, params)
    else if (method === HttpMethod.POST) response = await ApiCore.post(endpointRequest, params)
    else response = await ApiCore.get(endpointRequest)

    onSuccess(response.data)
  } catch (error) {
    handleError(error, onError)
  }
}
