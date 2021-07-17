import axios from 'axios'

const url = process.env.REACT_APP_API_URL

export const getProducts = () => {
  return axios
    .get(`${url}/product`)
    .then(res => res.data)
    .catch(err => err)
}
