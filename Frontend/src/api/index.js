import axios from 'axios'

const API_URL = process.env.PUBLIC_URL

// API to get products from mock server
export const getProducts = function() {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/product`)
    .then(res => {
      console.log(res.data, '===============')
      return res.data
    })
    .catch(err => err)
}
