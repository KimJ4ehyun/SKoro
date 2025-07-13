import axios from 'axios'

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  })

  return axiosInstance
}

export const axiosInstance = createAxiosInstance()
