const express = require('express')
const { complete } = require('mt-routes-schemas')
const { contact } = require('../emails/account')

const router = new express.Router()

router.post('/contact', async (req, res) => {
  complete(async () => {
    const response = await contact(req.body)
    res.send(response)
  }, res)
})

module.exports = router
