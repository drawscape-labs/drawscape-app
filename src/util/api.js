import { createStandaloneToast } from '@chakra-ui/react'
import axios from 'axios'
import Storage from './storage'

const { toast } = createStandaloneToast()

const Api = {
  get: async (endpoint, params) => {
    return request('GET', endpoint, null, params)
  },

  post: async (endpoint, data) => {
    return request('POST', endpoint, data)
  },

  delete: async (endpoint) => {
    return request('DELETE', endpoint)
  },
}

export default Api

async function request(method, endpoint, data, params) {
    
  try {
    const headers = {
      ...(Storage.get('access_token') && {
        Authorization: `Bearer ${Storage.get('access_token')}`,
      }),
    }

    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    const response = await axios({
      method,
      url: `${process.env.NEXT_PUBLIC_DRAWSCAPE_API_URL}/${endpoint}`,
      headers,
      responseType: 'json',
      data,
      params,
    })
    return response.data
  } catch (error) {
    const { data } = error.response ?? {}
    const errorMessage = data?.message || data?.error || 'An error has occurred'
    toast({
      title: errorMessage,
      status: 'error',
      isClosable: true,
    })
    throw new Error(errorMessage)
  }
}
