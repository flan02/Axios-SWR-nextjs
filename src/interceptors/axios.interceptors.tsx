import axios from 'axios'

export const PrivatePublicAxiosInterceptor = () => {
  axios.interceptors.request.use((req) => {
    console.log('Starting Request', req);
    return req
  })

  return (
    <div>axiosinterceptors</div>
  )
}

