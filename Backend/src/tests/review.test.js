const request = require('supertest')
const app = require('../app')
const Review = require('mt-routes-schemas').Review
const { setupDatabase, reviewId } = require('mt-routes-schemas')

beforeEach(setupDatabase)

describe('Reviews', () => {
  test('Adds Helpful', async () => {
    const res = await request(app)
      .post(`/review/${reviewId}/helpful`)
      .expect(200)
    const review = await Review.findById(reviewId)
    expect(res.body.helpful).toEqual(1)
  })

  test('Adds Unhelpful', async () => {
    const res = await request(app)
      .post(`/review/${reviewId}/unhelpful`)
      .expect(200)
    const review = await Review.findById(reviewId)
    expect(res.body.unhelpful).toEqual(1)
  })
})
