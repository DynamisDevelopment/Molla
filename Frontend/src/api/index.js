import axios from 'axios'

const API_URL = process.env.PUBLIC_URL

// API to get products from mock server
export const getProducts = function() {
  return axios
    .get('http://localhost:4000/product')
    .then(res => res.data)
    .catch(err => err)
}
